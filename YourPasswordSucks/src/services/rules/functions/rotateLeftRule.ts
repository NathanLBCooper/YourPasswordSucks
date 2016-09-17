import * as _ from "lodash";

/** Rotates the word left */
export class RotateLeftRule {
    transform(text: string): string {
        const textArr = text.split("");
        return _.slice(textArr, 1, textArr.length + 1).concat(textArr[0]).join("");
    }

    toString(): string {
        return "Rotates the word left";
    }
}