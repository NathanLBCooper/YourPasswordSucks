/** Do nothing */
export class UnknownRule {
    constructor(private ruleText: string) {}

    public transform(text: string): string {
        return text;
    }

    public toString(): string {
        return "unknown rule: " + this.ruleText;
    }
}
