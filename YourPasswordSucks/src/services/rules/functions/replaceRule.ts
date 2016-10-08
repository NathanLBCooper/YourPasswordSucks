function escapeRegex(str: string): string {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/** Replace all instances of X with Y */
export class ReplaceRule {
    constructor(private searchValue: string, private replaceValue: string) {
        this.transform = searchValue != null && searchValue != "" ? this.doTransform : text => text;
    }

    public transform: (text: string) => string;

    public toString(): string {
        return "Replace all instances of " + this.searchValue +
            " with " + this.replaceValue;
    }

    public doTransform(text: string): string {
        return text.replace(new RegExp(escapeRegex(this.searchValue), 'g'), this.replaceValue);
    }
}
