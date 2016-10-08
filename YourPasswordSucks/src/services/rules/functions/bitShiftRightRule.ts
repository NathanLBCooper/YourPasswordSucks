import { CharRule } from "./charRule";

/** Bitwise shift right character @ N */
export class BitShiftRightRule extends CharRule {
    constructor(private charPosition: number) {
        super(charPosition, char => char >> 1);
    }

    toString(): string {
        return "Bitwise shift right character @ " + this.charPosition;
    }
}