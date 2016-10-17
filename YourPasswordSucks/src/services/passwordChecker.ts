import {Promise} from "es6-promise";

import { PasswordData } from "./data/passwordData";
import { RuleData } from "./data/ruleData";
import { RuleParser } from './rules/ruleParser';
import { Analyser } from "./analyser";
import { MatchResult } from "./matchResult";
import { AnalysisWork } from "./analysisWork";

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

    public CheckConcurrently(passwords: string[], maxConcurrency: number): Promise<MatchResult[]> {
        return this.ruleData.getRules().then(fetchedRules => {
            return this.passwordData.getPasswords().then(
                fetchedPasswords => {
                    const totalWork: AnalysisWork = {
                       passwords: passwords, passwordDictionary: fetchedPasswords, ruleSet: fetchedRules
                    };

                    return StartWorker(totalWork);
                }
            )
        });
    }
}

function StartWorker(work: AnalysisWork): Promise<MatchResult[]>{
    return new Promise(function(resolve,reject){
        var worker: IWebWorker = new Worker();
        alert("worker posted work of size: " + work.passwordDictionary.length * work.passwords.length * work.ruleSet.length);
        worker.postMessage(work);
        worker.onmessage = function(event) {
            alert("worker returning with " + event.data.length + " results");
            worker.terminate();
            resolve(event.data);
        }
    });
}
