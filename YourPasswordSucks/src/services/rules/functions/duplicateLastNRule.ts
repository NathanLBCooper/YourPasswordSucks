import * as _ from "lodash";

/** Duplicates last character N times */
export class DuplicateLastNRule {
    constructor(private times: number) {}

    public transform(text: string): string {
        const textArr = text.split("");

        let lastCharsArr = [textArr[textArr.length - 1]];
        for (let i = 0; i < this.times; i++) {
            lastCharsArr.push(textArr[textArr.length - 1]);
        }

        return _.slice(textArr, 0, textArr.length - 1).concat(lastCharsArr).join("");
            
    }

    public toString(): string {
        return "Duplicates last character " + this.times + " times";
    }
}
