/** Prepend character X to front */
export class PrependCharacterRule {
    constructor(private characterToPrepend: string) {}

    transform(text: string): string {
        return this.characterToPrepend + text;
    }

    toString(): string {
        return "Prepend character X to front";
    }
}