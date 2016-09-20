import * as _ from "lodash";

/** Inserts character X at position N */
export class InsertAtNRule {
    constructor(private position: number, private character: string) {
        this.transform = position > -1 && character != "" ? this.doTransform : text => text;
    }

    public transform: (text:string) => string;

    public toString(): string {
        return "Inserts " + this.character +
            " at position " + this.position;
    }

    private doTransform(text: string): string {
        const textArr = text.split("");
        if (text.length < this.position) {
            return text;
        }
        
        return _.slice(textArr, 0, this.position).
            concat(this.character).
            concat(_.slice(textArr, this.position, textArr.length)).join("");
    }
}
