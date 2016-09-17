/** Reverse the entire word */
export class ReverseRule {
    transform(text: string): string {
        // doesn't necessarily support unicode
        return text.split("").reverse().join("");
    }

    toString(): string {
        return "Reverse the entire word";
    }
}