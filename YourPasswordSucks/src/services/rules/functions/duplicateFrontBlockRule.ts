import { CharRule } from "./charRule";

/** Duplicates first N characters */
export class DuplicateFrontBlockRule {
    constructor(private size: number) {}

    public transform(text: string): string {
        const textArr = text.split("");

        if(this.size < 0){
            return text;
        }

        return textArr.slice(0, this.size).concat(textArr).join("");
    }

    toString(): string {
        return "Duplicates first " + this.size + " characters";
    }
}
