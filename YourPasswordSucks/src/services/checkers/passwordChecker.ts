import { IRule } from '../rules/iRule';
import { MatchResult } from './matchResult';

export class PasswordChecker {
    constructor(private rules: IRule[], private passwordDictionary: string[]) {}

    public isMatch(password: string): MatchResult {
        for (const rule of this.rules) {
            for (const dictionaryItem of this.passwordDictionary) {
                const transformedItem = rule.transform(dictionaryItem);
                if (transformedItem.toUpperCase() === password.toUpperCase()){
                    return new MatchResult(password, dictionaryItem, rule);
                }
            }
        }

        return MatchResult.NoMatch();
    }
}
