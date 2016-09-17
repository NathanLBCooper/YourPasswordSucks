import * as _ from "lodash";

/** Deletes first character */
export class TruncateLeftRule {
    transform(text: string): string {
        const textArr = text.split("");
        return (_.slice(textArr, 1, textArr.length)).join("");
    }

    toString(): string {
        return "Deletes first character";
    }
}