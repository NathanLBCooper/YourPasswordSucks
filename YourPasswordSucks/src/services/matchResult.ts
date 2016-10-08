import { IRule } from './rules/iRule';

export class MatchResult {
    public reason: string;

    constructor(
        password: string, dictionaryItem: string, rule: IRule
        ) {
        this.reason = "\"" + password + "\" matches \"" + dictionaryItem +
            "\" in dictionary, with rule \"" + rule.toString() + "\""; 
    }
}
