/** Duplicate word reversed  */
export class DuplicateReverseRule {
    public transform(text: string): string {
        return text + text.split("").reverse().join("");
    }

    public toString(): string {
        return "Duplicate word reversed";
    }
}