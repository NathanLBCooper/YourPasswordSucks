import * as _ from "lodash";

import { IRule } from './iRule';
import { NoopRule } from './functions/noopRule';
import { ReverseRule } from './functions/reverseRule';
import { DuplicateRule } from './functions/duplicateRule';
import { DuplicateReverseRule } from './functions/duplicateReverseRule';
import { RotateLeftRule } from './functions/rotateLeftRule';
import { RotateRightRule } from './functions/rotateRightRule';
import { AppendCharacterRule } from './functions/appendCharacterRule';
import { PrependCharacterRule } from './functions/prependCharacterRule';
import { TruncateLeftRule } from './functions/truncateLeftRule';
import { TruncateRightRule } from './functions/truncateRightRule';
import { DeleteAtNRule } from './functions/deleteAtNRule';

function CheckParam(params: string[], action :(params: string[]) => IRule, expectedNumber: number = 1) {
    if(params.length < expectedNumber){
        return new NoopRule();
    }
    return action(params);
}

function CheckNumberParam(params: string[], action :(params: number) => IRule) {
    if(params.length < 1){
        return new NoopRule();
    }
    const num = parseInt(params[0], 36);
    if(isNaN(num)) {
        return new NoopRule();
    }
    return action(num);
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
functionMap["p"] = params => CheckNumberParam(params, prm => new DuplicateRule(prm));
functionMap["f"] = params => new DuplicateReverseRule();
functionMap["{"] = params => new RotateLeftRule();
functionMap["}"] = params => new RotateRightRule();
functionMap["$"] = params => CheckParam(params, prms => new AppendCharacterRule(prms[0]));
functionMap["^"] = params => CheckParam(params, prms => new PrependCharacterRule(prms[0]));
functionMap["["] = params => new TruncateLeftRule();
functionMap["]"] = params => new TruncateRightRule();
functionMap["D"] = params => CheckNumberParam(params, prm => new DeleteAtNRule(prm)); // todo mix with ommit range

export class RuleFunctionParser {
    // todo turns one rule function (eg "{") into an IRule
    public parse(functionStr: string): IRule {
        const functionStrArr = functionStr.split("");
        const firstChar = functionStrArr[0];
        if(!(firstChar in functionMap)) {
            // unknown
            return new NoopRule();
        }
        return functionMap[firstChar](
            _.slice(functionStrArr, 1, functionStrArr.length)
            );
    }
}