import { MatchResult } from './matchResult';
import { IMatchChecker } from './iMatchChecker';
import { ExactMatchChecker } from './exactMatchChecker';
import { RuleParser } from '../rules/RuleParser';

export class RuleMatchChecker {
    private ruleParser: RuleParser;

    constructor(rules: string[]) {
        this.ruleParser = new RuleParser(rules);
    }

    isMatch(password: string, commonPasswords: string[]): MatchResult {
        const stringsToCheck = this.ruleParser.reverseRule(password);

        throw "todo";
    }
}