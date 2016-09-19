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
import { OmitRangeRule } from './functions/omitRangeRule';
import { ExtractRangeRule } from './functions/extractRangeRule';

function CheckParam(params: string[], action :(params: string[]) => IRule, expectedNumber: number = 1) {
    if(params.length < expectedNumber){
        return new NoopRule();
    }
    return action(params);
}

function CheckNumberParam(params: string[], action :(params: number[]) => IRule, expectedNumber: number = 1) {
    if(params.length < expectedNumber){
        return new NoopRule();
    }

    let nums: number[] = [];
    for(let i = 0; i < expectedNumber; i++){
        const num = parseInt(params[i], 36);
        if(isNaN(num)) {
            return new NoopRule();
        }
        nums.push(num);
    }

    return action(nums);
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
functionMap["p"] = params => CheckNumberParam(params, prm => new DuplicateRule(prm[0]));
functionMap["f"] = params => new DuplicateReverseRule();
functionMap["{"] = params => new RotateLeftRule();
functionMap["}"] = params => new RotateRightRule();
functionMap["$"] = params => CheckParam(params, prms => new AppendCharacterRule(prms[0]));
functionMap["^"] = params => CheckParam(params, prms => new PrependCharacterRule(prms[0]));
functionMap["["] = params => new TruncateLeftRule();
functionMap["]"] = params => new TruncateRightRule();
functionMap["D"] = params => CheckNumberParam(params, prm => new OmitRangeRule(prm[0], 1));
functionMap["x"] = params => CheckNumberParam(params, prm => new ExtractRangeRule(prm[0], prm[1]), 2);
functionMap["O"] = params => CheckNumberParam(params, prm => new OmitRangeRule(prm[0], prm[1]), 2);

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