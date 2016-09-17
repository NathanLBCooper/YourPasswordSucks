/** Do nothing */
export class NoopRule {
    transform(text: string): string {
        return text;
    }

    toString(): string {
        return "Do Nothing";
    }
}
