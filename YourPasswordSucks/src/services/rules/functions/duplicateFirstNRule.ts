import * as _ from "lodash";

/** Duplicates first character N times */
export class DuplicateFirstNRule {
    constructor(private times: number) {}

    public transform(text: string): string {
        const textArr = text.split("");

        let firstCharsArr = [textArr[0]];
        for (let i = 0; i < this.times; i++) {
            firstCharsArr.push(textArr[0]);
        }

        return firstCharsArr.concat(
            _.slice(textArr, 1, textArr.length)
            ).join("");
    }

    public toString(): string {
        return "Duplicates first character " + this.times + " times";
    }
}
