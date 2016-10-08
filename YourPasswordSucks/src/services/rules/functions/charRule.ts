export class CharRule {
    constructor(private position: number, private charFunc: (charCode: number) => number ) {}

    public transform(text: string): string {
        const textArr = text.split("");

        if(this.position < 0 || textArr.length - 1 < this.position) {
            return text;
        }

        let char = this.charFunc(textArr[this.position].charCodeAt(0));
        textArr[this.position] = String.fromCharCode(char);

        return textArr.join("");
    }

    
}