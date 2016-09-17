import { IRule } from './iRule';

export class CompositeRule {
    constructor(private rules: IRule[]) {}

    transform(text: string): string {
        let transformed = text;
        for(const rule of this.rules) {
            transformed = rule.transform(transformed)
        }

        return transformed;
    }

    toString(): string {
        let str = "Rules applied: ";
        for(const rule of this.rules) {
            str += "\n    " + rule.toString();
        }
        return str;
    }
}