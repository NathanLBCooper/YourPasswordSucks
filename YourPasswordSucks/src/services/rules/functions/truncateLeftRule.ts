import * as _ from "lodash";

/** Deletes first character */
export class TruncateLeftRule {
    public transform(text: string): string {
        const textArr = text.split("");
        return (_.slice(textArr, 1, textArr.length)).join("");
    }

    public toString(): string {
        return "Deletes first character";
    }
}