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

    public CheckConcurrently(passwords: string[], exitOnFirstMatch: boolean): any {
        return this.ruleData.getRules().then(fetchedRules => {
            return this.passwordData.getPasswords().then(
                fetchedPasswords => {
                   const work: AnalysisWork = {
                       passwords: passwords, passwordDictionary: fetchedPasswords, ruleSet: fetchedRules
                    };
                    var worker: IWebWorker = new Worker();
                    worker.postMessage(work);
                    worker.onmessage = function(event) {
                        // todo
                        const results: MatchResult[] = event.data;
                        if(results.length > 0) {
                            alert(results[0].reason);
                        }
                        worker.terminate();
                    };
                }
            )
        });
    }
}
