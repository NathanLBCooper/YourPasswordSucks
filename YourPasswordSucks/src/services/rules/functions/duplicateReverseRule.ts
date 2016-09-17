/** Duplicate word reversed  */
export class DuplicateReverseRule {
    transform(text: string): string {
        return text + text.split("").reverse().join("");
    }

    toString(): string {
        return "Duplicate word reversed";
    }
}