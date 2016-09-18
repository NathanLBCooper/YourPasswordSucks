/** Append character X to end */
export class AppendCharacterRule {
    constructor(private characterToAppend: string) {}

    public transform(text: string): string {
        return text + this.characterToAppend;
    }

    public toString(): string {
        return "Append character X to end";
    }
}