export interface IRule {
    transform(text: string): string;
    toString(): string;
}
