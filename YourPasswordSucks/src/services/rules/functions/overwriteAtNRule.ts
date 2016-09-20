/** Overwrites character at position N with X */
export class OverwriteAtNRule {
    constructor(private position: number, private character: string) {
        this.transform = position > -1 ? this.doTransform : text => text;
    }

    public transform: (text:string) => string;

    public toString(): string {
        return "Overwrites character at position " + this.position +
            " with " + this.character;
    }

    private doTransform(text: string): string {
        let textArr = text.split("");
        if (textArr.length - 1 < this.position) {
            return text;
        }

        textArr[this.position] = this.character;
        return textArr.join("");
    }
}
