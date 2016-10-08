import { CharRule } from "./charRule";

/** Replaces character @ N with value at @ N plus x */
export class ReplaceCharRule {
    constructor(private position: number, private offset: number) {}

    public transform(text: string): string {
        const textArr = text.split("");
        const sourceIndex = this.position + this.offset;

        if (this.position < 0 ||
            this.position > textArr.length - 1 ||
            sourceIndex < 0 ||
            sourceIndex > textArr.length - 1){
            return text;
        }

        textArr[this.position] = textArr[sourceIndex];

        return textArr.join("");
    }

    toString(): string {
        return "Replaces character @ " + this.position +
        " with value at @ " + this.position + " plus 1";
    }
}
