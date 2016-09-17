/** Append character X to end */
export class AppendCharacterRule {
    constructor(private characterToAppend: string) {}

    transform(text: string): string {
        return text + this.characterToAppend;
    }

    toString(): string {
        return "Append character X to end";
    }
}