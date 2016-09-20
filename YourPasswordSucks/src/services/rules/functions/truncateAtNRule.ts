import * as _ from "lodash";

/** Truncate word at position N */
export class TruncateAtNRule {
    constructor(private position: number) {
        this.transform = position > -1 ? this.doTransform : text => "";
    }

    public transform: (text: string) => string;

    public toString(): string {
        return "Truncate word at position N";
    }

    private doTransform(text: string): string {
        const textArr = text.split("");
        return (_.slice(textArr, 0, this.position)).join("");
    }
}