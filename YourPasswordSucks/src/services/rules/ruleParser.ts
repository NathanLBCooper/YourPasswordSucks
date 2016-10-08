import { IRule } from './iRule';
import { RuleFunctionParser } from './ruleFunctionParser';
import { UnknownRule } from './functions/unknownRule';
import { CompositeRule } from './compositeRule';

export class RuleParser {
    // todo turns entire rule into a composite IRule
    // (splits up by whitespace and delegates to ruleFunctionParser)
    constructor(private ruleFunctionParser: RuleFunctionParser) {}

    public parse(ruleStr: string): IRule {
        const functionStrs = ruleStr.split(" ");
        let ruleFuncs: IRule[] = [];
        if (functionStrs.length < 1) {
            return new UnknownRule(ruleStr);
        }

        for(const funcStr of functionStrs) {
            ruleFuncs.push(this.ruleFunctionParser.parse(funcStr))
        }

        return new CompositeRule(ruleFuncs);
    }

    public canParse(ruleStr: string): boolean {
        const functionStrs = ruleStr.split(" ");

        if (functionStrs.length < 1) {
            return false;
        }

        for(const funcStr of functionStrs) {
            if (!this.ruleFunctionParser.canParse(funcStr)){
                return false;
            }
        }

        return true;
    }
}
