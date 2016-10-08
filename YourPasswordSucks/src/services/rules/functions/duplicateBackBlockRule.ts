import { CharRule } from "./charRule";

/** Duplicates last N characters */
export class DuplicateBackBlockRule {
    constructor(private size: number) {}

    public transform(text: string): string {
        const textArr = text.split("");

        if(this.size < 0){
            return text;
        }

        return textArr.concat(
            textArr.slice(textArr.length - this.size, textArr.length)
            ).join("");
    }

    toString(): string {
        return "Duplicates last " + this.size + " characters";
    }
}
