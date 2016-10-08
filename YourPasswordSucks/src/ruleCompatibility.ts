import { expect } from "chai";
import {Promise} from "es6-promise";

import { RuleData } from "./services/data/ruleData";
import { RuleParser } from './services/rules/ruleParser';
import { RuleFunctionParser } from './services/rules/ruleFunctionParser';

/** Check ability of system to parse a target set of rules */
export class RuleCompatibility {

    constructor(private ruleData: RuleData, private parser: RuleParser) {}

    public Check(): Promise<CompatibilityResult> {
        let succeeded: string[] = [];
        let failed: string[] = [];

        return this.ruleData.getRules().then(
            fetchedRules => {
                for (const rule of fetchedRules) {
                    if (this.parser.canParse(rule)){
                        succeeded.push(rule);
                    } else {
                        failed.push(rule);
                    }
                }

                return new CompatibilityResult(succeeded, failed);
            }
        )
    }
}

export class CompatibilityResult {
    constructor(
        public succeeded: string[],
        public failed: string[]) {}

    public getSuccessRate(): number {
        return this.succeeded.length /
            (this.succeeded.length + this.failed.length);
    }

    public toString(): string {
         return "Success Percentage: " +
            this.getSuccessRate() * 100 + "% \n" +
            "Succeeded: \n " + 
            JSON.stringify(this.succeeded) +
            "\n Failed: \n " +
            JSON.stringify(this.failed);
    }
}
