import { CharRule } from "./charRule";

/** Increment character @ N by 1 ascii value */
export class AsciiIncrementRule extends CharRule {
    constructor(private charPosition: number) {
        super(charPosition, char => char + 1);
    }

    toString(): string {
        return "Increment character @ " + this.charPosition + " by 1 ascii value";
    }
}
