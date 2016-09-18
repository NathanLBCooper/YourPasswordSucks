import * as _ from "lodash";

/** Deletes M characters, starting at position N  */
export class OmitRangeRule {
    constructor(private position: number, private numberToRemove: number) {
        this.transform = position > -1 && numberToRemove > 0 ? this.doTransform : text => text;
    }

    public transform: (text:string) => string;

    public toString(): string {
        return "Extracts " + this.numberToRemove +
            " characters, starting at position " + this.position;
    }

    private doTransform(text: string): string {
        const textArr = text.split("");
        return _.slice(textArr, 0, this.position).concat(
            _.slice(textArr, this.position + this.numberToRemove, textArr.length)
            ).join("");
    }
}
