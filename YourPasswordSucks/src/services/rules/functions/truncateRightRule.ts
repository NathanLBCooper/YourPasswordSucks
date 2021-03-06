import * as _ from "lodash";

/** Deletes last character */
export class TruncateRightRule {
    public transform(text: string): string {
        const textArr = text.split("");
        return (_.slice(textArr, 0, textArr.length - 1)).join("");
    }

    public toString(): string {
        return "Deletes last character";
    }
}