import { IRule } from '../rules/iRule';

export class MatchResult {
    public isMatch: boolean;
    public reason: string;

    constructor(
        password: string, dictionaryItem: string, rule: IRule
        ) {
        this.isMatch = true;
        this.reason = "\"" + password + "\" matches \"" + dictionaryItem +
            "\" in dictionary, with rule \"" + rule.toString() + "\""; 
    }

    public static NoMatch(): MatchResult {
        return { isMatch: false, reason: "no match" };
    }
}
