import { MatchResult } from './matchResult';

export class ExactMatchChecker {
    public isMatch(password: string, commonPasswords: string[]): MatchResult {
        let index = commonPasswords.indexOf(password.toLowerCase());
        if(index === -1) {
            return new MatchResult(false)
        }

        return new MatchResult(true, "Exact match with " + commonPasswords[index]);
    }
}
