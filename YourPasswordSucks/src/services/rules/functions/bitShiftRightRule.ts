/** Bitwise shift right character @ N */
export class BitShiftRightRule {
    constructor(private position: number) {}

    public transform(text: string): string {
        const textArr = text.split("");

        if(this.position < 0 || textArr.length - 1 < this.position) {
            return text;
        }

        let char = textArr[this.position].charCodeAt(0) >> 1;
        textArr[this.position] = String.fromCharCode(char);

        return textArr.join("");
    }

    public toString(): string {
        return "Bitwise shift right character @ " + this.position;
    }
}