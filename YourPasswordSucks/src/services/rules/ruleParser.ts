export class RuleParser {
    constructor(private rules: string[]) {}
    /** Calculate the possible dictionary starting points that could transform
     * into password via the set rules
     */
    public reverseRule(password: string): string[] {
        throw "todo"
    }
}