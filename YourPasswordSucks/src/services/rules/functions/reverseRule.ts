/** Reverse the entire word */
export class ReverseRule {
    public transform(text: string): string {
        // doesn't necessarily support unicode
        return text.split("").reverse().join("");
    }

    public toString(): string {
        return "Reverse the entire word";
    }
}