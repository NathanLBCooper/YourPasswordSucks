import { IRule } from './rules/iRule';
import { MatchResult } from './matchResult';

export class Analyser {
    constructor(private rules: IRule[], private passwordDictionary: string[]) {}

    public isMatch(passwords: string[], exitOnFirstMatch: boolean): MatchResult[] {

        if (passwords.length === 1) {
            return this.isMatch_Str(passwords[0], exitOnFirstMatch);
        }

        let matches: MatchResult[] = [];
        let remainingPasswords = passwords.slice(0);

        for (const rule of this.rules) {
            for (const dictionaryItem of this.passwordDictionary) {
                findMatches(rule, dictionaryItem, remainingPasswords, matches, exitOnFirstMatch);
                if (remainingPasswords.length === 0){
                    return matches;
                }
            }
        }

        return matches;
    }

    /**
     * Checking one password string is more performant than checking [ password ]
     */
    private isMatch_Str(password: string, exitOnFirstMatch: boolean): MatchResult[] {
        let matches: MatchResult[] = [];

        for (const rule of this.rules) {
            for (const dictionaryItem of this.passwordDictionary) {
                const transformedItem = rule.transform(dictionaryItem);
                if (compareString(transformedItem, password)){
                    matches.push(new MatchResult(password, dictionaryItem, rule));
                    if (exitOnFirstMatch) {
                        return matches;
                    }
                }
            }
        }

        return matches;
    }
}

/**
 * Mutates passed matches to add found matches.
 * Mutates passed passwords to remove passwords for found matches.
 * Performance of more elegent solutions is garbage, and this gets run a lot.
 */
function findMatches(rule: IRule, dictionaryItem: string, passwords: string[],
    matches: MatchResult[], exitOnFirstMatch: boolean): void {
    const transformedItem = rule.transform(dictionaryItem);

    let length = passwords.length;
    for (let i = 0; i < length; ++i) {
        if (compareString(transformedItem, passwords[i])){
            matches.push(new MatchResult(passwords[i], dictionaryItem, rule));
            if (exitOnFirstMatch) {
                passwords.splice(i, 1);
                --i; --length;
            }
        }
    }
}

function compareString(left: string, right: string): boolean {
    return (left.toUpperCase() === right.toUpperCase());
}
