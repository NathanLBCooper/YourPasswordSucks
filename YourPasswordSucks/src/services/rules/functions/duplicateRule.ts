/** Append duplicated word N times */
export class DuplicateRule {
    constructor(private times: number) {}

    transform(text: string): string {
        return _.repeat(text, this.times + 1);
    }

    toString(): string {
        return "Append duplicated word" + this.times + "times";
    }
}