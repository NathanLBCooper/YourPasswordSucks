/** Do nothing */
export class NoopRule {
    public transform(text: string): string {
        return text;
    }

    public toString(): string {
        return "Do Nothing";
    }
}
