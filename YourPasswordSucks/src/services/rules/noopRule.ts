export class NoopRule {
    transform(text: string): string {
        return text;
    }

    toString(): string {
        return "<no changes>";
    }
}
