import { MatchResult } from './matchResult';
import { IMatchChecker } from './iMatchChecker';
import { ExactMatchChecker } from './exactMatchChecker';

export class MatchChecker {
    private checkers: IMatchChecker[] = [ new ExactMatchChecker() ];

    public isMatch(password: string, commonPasswords: string[]): MatchResult {
        for (let i = 0; i < this.checkers.length; i++){
            let result = this.checkers[i].isMatch(password, commonPasswords);
            if (result.isMatch) {
                return result;
            }
        }

        return new MatchResult(false);
    }
}
