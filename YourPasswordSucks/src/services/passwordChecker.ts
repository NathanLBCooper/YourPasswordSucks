import {Promise} from "es6-promise";

import { PasswordData } from "./data/passwordData";
import { RuleData } from "./data/ruleData";
import { RuleParser } from './rules/ruleParser';
import { Analyser } from "./analyser";
import { MatchResult } from "./matchResult";

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
}
