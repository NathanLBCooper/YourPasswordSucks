import { CharRule } from "./charRule";

/** Decrement character @ N by 1 ascii value */
export class AsciiDecrementRule extends CharRule {
    constructor(private charPosition: number) {
        super(charPosition, char => char - 1);
    }

    toString(): string {
        return "Decrement character @ " + this.charPosition + " by 1 ascii value";
    }
}
