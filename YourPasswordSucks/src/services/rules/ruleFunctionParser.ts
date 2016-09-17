import { IRule } from './iRule'
import { NoopRule } from './functions/noopRule'
import { ReverseRule } from './functions/reverseRule'
import { DuplicateRule } from './functions/duplicateRule'
import { DuplicateReverseRule } from './functions/duplicateReverseRule'
import { RotateLeftRule } from './functions/rotateLeftRule'
import { RotateRightRule } from './functions/rotateRightRule'
import { AppendCharacterRule } from './functions/appendCharacterRule'
import { PrependCharacterRule } from './functions/prependCharacterRule'

export class RuleFunctionParser {
    // todo turns one rule function (eg "{") into an IRule
}

var functionMap: { [ruleChar: string]: (params: string[]) => IRule; } = { };

/**
 * I don't care about case, as program is case-insensitive
 * I don't care about false positives from that,
 * if your password differs from a weak password only by case imho it's weak
*/

functionMap[":"] = params => new NoopRule();
functionMap["r"] = params => new ReverseRule();
functionMap["d"] = params => new DuplicateRule(1);
functionMap["p"] = params => new DuplicateRule(+params[0]);
functionMap["f"] = params => new DuplicateReverseRule();
functionMap["{"] = params => new RotateLeftRule();
functionMap["}"] = params => new RotateRightRule();
functionMap["$"] = params => new AppendCharacterRule(params[0]);
functionMap["^"] = params => new PrependCharacterRule(params[0]);