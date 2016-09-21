/** Append duplicated word N times */
export class DuplicateWordRule {
    constructor(private times: number) {}

    public transform(text: string): string {
        return _.repeat(text, this.times + 1);
    }

    public toString(): string {
        return "Append duplicated word" + this.times + "times";
    }
}