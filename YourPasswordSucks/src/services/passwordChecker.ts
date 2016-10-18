import {Promise} from "es6-promise";

import { PasswordData } from "./data/passwordData";
import { RuleData } from "./data/ruleData";
import { RuleParser } from './rules/ruleParser';
import { Analyser } from "./analyser";
import { MatchResult } from "./matchResult";
import { AnalysisWork, SplitWork } from "./analysisWork";
import { ProgressLogger } from "./progressLogger";

import Worker = require("worker!../worker");

interface IWebWorker {
    postMessage(any): any;
    onmessage(any): void;
    terminate(): void;
}

export class PasswordChecker {

    constructor(private passwordData: PasswordData,
        private ruleData: RuleData,
        private ruleParser: RuleParser,
        private analyser: Analyser) { }

    public Check(passwords: string[], exitOnFirstMatch: boolean): Promise<MatchResult[]> {
        return this.ruleData.getRules().then(fetchedRules => {
            return this.passwordData.getPasswords().then(
                fetchedPasswords => {
                    const rules = fetchedRules.map(rule => this.ruleParser.parse(rule));
                    return this.analyser.getMatches(
                        passwords, rules, fetchedPasswords, exitOnFirstMatch
                        );
                }
            )
        });
    }

    public CheckConcurrently(passwords: string[], progressLogger: ProgressLogger, chunkSize: number): Promise<MatchResult[]> {
        return this.ruleData.getRules().then(fetchedRules => {
            return this.passwordData.getPasswords().then(
                fetchedPasswords => {
                    const totalWork: AnalysisWork = {
                       passwords: passwords, passwordDictionary: fetchedPasswords, ruleSet: fetchedRules
                    };

                    // todo, is starting all web workers at once okay?
                    const workChunks = SplitWork(totalWork, chunkSize);
                    progressLogger.setTotalWorkUnits(workChunks.length);;
                    const results: Promise<MatchResult[]>[] = workChunks.map(work => StartWorker(work, progressLogger));

                    return Promise.all(results).then( (resultArrays: MatchResult[][]) => {
                        return [].concat.apply([], resultArrays);
                    });
                }
            )
        });
    }
}

function StartWorker(work: AnalysisWork, progressLogger: ProgressLogger): Promise<MatchResult[]>{
    return new Promise(function(resolve,reject){
        var worker: IWebWorker = new Worker();
        worker.postMessage(work);
        worker.onmessage = function(event) {
            progressLogger.reportWorkUnitComplete();
            worker.terminate();
            resolve(event.data);
        }
    });
}
