import * as _ from "lodash";

/** Extracts M characters, starting at position N  */
export class ExtractRangeRule {
    constructor(private position: number, private numberToTake: number) {
        this.transform = position > -1 && numberToTake > 0 ? this.doTransform : text => "";
    }

    public transform: (text:string) => string;

    public toString(): string {
        return "Extracts " + this.numberToTake +
            " characters, starting at position " + this.position;
    }

    private doTransform(text: string): string {
        const textArr = text.split("");
        return _.slice(textArr, this.position, this.position + this.numberToTake).join("");
    }
}
