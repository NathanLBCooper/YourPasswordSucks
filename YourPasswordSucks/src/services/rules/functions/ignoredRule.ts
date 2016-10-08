/** Do nothing */
export class IgnoredRule {
    public transform(text: string): string {
        return text;
    }

    public toString(): string {
        return "Ignored rule";
    }
}
