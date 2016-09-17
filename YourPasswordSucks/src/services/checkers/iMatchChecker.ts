import { MatchResult } from './matchResult';

export interface IMatchChecker {
    isMatch(password: string, commonPasswords: string[]): MatchResult;
}
