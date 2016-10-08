/** Prepend character X to front */
export class PrependCharacterRule {
    constructor(private characterToPrepend: string) {}

    public transform(text: string): string {
        return this.characterToPrepend + text;
    }

    public toString(): string {
        return "Prepend character " +
            this.characterToPrepend + " to front";
    }
}