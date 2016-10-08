import * as _ from "lodash";

/** Swaps character X with Y */
export class SwapRule {
    constructor(private left: number, private right: number) {}

    public transform(text: string): string {
        const textArr = text.split("");

        // negative indexing from the back of the array
        let leftIndex = this.left > -1 ? this.left : textArr.length + this.left;
        let rightIndex = this.right > -1 ? this.right : textArr.length + this.right;

        if (leftIndex < 0 || rightIndex < 0 ||
            textArr.length - 1 < leftIndex ||
            textArr.length - 1 < rightIndex) {
                return text;
            }

        var leftElement = textArr[leftIndex];
        textArr[leftIndex] = textArr[rightIndex];
        textArr[rightIndex] = leftElement;

        return textArr.join("");
    }

    public toString(): string {
        return "Swaps character " + this.left + " with " + this.right;
    }
}