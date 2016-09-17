import { IRule } from './iRule';
import { RuleFunctionParser } from './ruleFunctionParser';
import { NoopRule } from './functions/noopRule';
import { CompositeRule } from './compositeRule';

export class RuleParser {
    // todo turns entire rule into a composite IRule
    // (splits up by whitespace and delegates to ruleFunctionParser)
    constructor(private ruleFunctionParser: RuleFunctionParser) {}

    public parse(ruleStr: string): IRule {
        const functionStrs = ruleStr.split(" ");
        let ruleFuncs: IRule[] = [];
        for(const funcStr of functionStrs) {
            ruleFuncs.push(this.ruleFunctionParser.parse(funcStr))
        }

        if(ruleFuncs.length < 1) {
            return new NoopRule();
        }
        
        return new CompositeRule(ruleFuncs);
    }
}
