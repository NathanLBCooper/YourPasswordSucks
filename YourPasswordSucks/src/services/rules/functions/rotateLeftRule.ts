import * as _ from "lodash";

/** Rotates the word left */
export class RotateLeftRule {
    transform(text: string): string {
        const textArr = text.split("");
        if (textArr.length < 2) {
            throw "text length "+ textArr.length + " is too short to be rotated";
        }
        return _.slice(textArr, 1, textArr.length + 1).concat(textArr[0]).join("");
    }

    toString(): string {
        return "Rotates the word left";
    }
}