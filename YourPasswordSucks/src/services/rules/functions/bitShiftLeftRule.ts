import { CharRule } from "./charRule";

/** Bitwise shift left character @ N */
export class BitShiftLeftRule extends CharRule {
    constructor(private charPosition: number) {
        super(charPosition, char => char << 1);
    }

    toString(): string {
        return "Bitwise shift left character @ " + this.charPosition;
    }
}
