import {Promise} from "es6-promise";

import { PasswordData } from "./data/passwordData";
import { RuleData } from "./data/ruleData";
import { RuleParser } from './rules/ruleParser';
import { Analyser } from "./analyser";
import { MatchResult } from "./matchResult";

export class PasswordChecker {

    constructor(private passwordData: PasswordData,
        private ruleData: RuleData,
        private ruleParser: RuleParser) { }

    public Check(passwords: string[], exitOnFirstMatch: boolean): Promise<MatchResult[]> {
        return this.ruleData.getRules().then(fetchedRules => {
            var rules = fetchedRules.map(fetched => this.ruleParser.parse(fetched));
            return this.passwordData.getPasswords().then(
                fetchedPasswords => {
                    const analyser = new Analyser(rules, fetchedPasswords);
                    return analyser.isMatch(passwords, exitOnFirstMatch);
                }
            )
        });
    }

}