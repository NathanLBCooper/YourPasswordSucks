/** Deletes character at position N */
export class DeleteAtNRule {
    constructor(private position: number) {}

    transform(text: string): string {
        const textArr = text.split("");
        if(textArr.length > this.position) {
            textArr.splice(this.position, 1);
        }
        return textArr.join("");
    }

    toString(): string {
        return "Deletes character at position " + this.position;
    }
}