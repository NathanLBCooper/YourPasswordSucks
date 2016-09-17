import * as _ from "lodash";

/** Rotates the word right */
export class RotateRightRule {
    transform(text: string): string {
        const textArr = text.split("");
        return [textArr[textArr.length - 1]].
            concat(_.slice(textArr, 0, textArr.length - 1)).join("");
    }

    toString(): string {
        return "Rotates the word right";
    }
}