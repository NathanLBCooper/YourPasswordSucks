import * as _ from "lodash";

import { IRule } from "./iRule";
import { NoopRule } from "./functions/noopRule";
import { ReverseRule } from "./functions/reverseRule";
import { DuplicateRule } from "./functions/duplicateRule";
import { DuplicateReverseRule } from "./functions/duplicateReverseRule";
import { RotateLeftRule } from "./functions/rotateLeftRule";
import { RotateRightRule } from "./functions/rotateRightRule";
import { AppendCharacterRule } from "./functions/appendCharacterRule";
import { PrependCharacterRule } from "./functions/prependCharacterRule";
import { TruncateLeftRule } from "./functions/truncateLeftRule";
import { TruncateRightRule } from "./functions/truncateRightRule";
import { OmitRangeRule } from "./functions/omitRangeRule";
import { ExtractRangeRule } from "./functions/extractRangeRule";
import { InsertAtNRule } from "./functions/InsertAtNRule";

function ParseStrParam(param: string): any {
    return { valid: true, value: param };
}

function ParseBase36NumberParam(param: string): any {
    const num = parseInt(param, 36);
    if(isNaN(num)) {
        return { valid: false, value: undefined };
    }
    return { valid: true, value: num };
}

/** Helps to convert string[] to an IRule via parsed any[]. Not even slightly typesafe. */
function Parse(params: string[], action: (params: any[]) => IRule, parsers: ((param: string) => any)[]): IRule {
    if (params.length < parsers.length) {
        return new NoopRule();
    }

    let parsedParams = new Array<any>();
    for (let i = 0; i < parsers.length; i++) {
        const parsed = parsers[i](params[i]);
        if(!parsed.valid) {
            return new NoopRule();
        }
        parsedParams.push(parsed.value);
    }

    return action(parsedParams);
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
functionMap["p"] = params => Parse(params, prm => new DuplicateRule(prm[0]), [ParseBase36NumberParam]);
functionMap["f"] = params => new DuplicateReverseRule();
functionMap["{"] = params => new RotateLeftRule();
functionMap["}"] = params => new RotateRightRule();
functionMap["$"] = params => Parse(params, prms => new AppendCharacterRule(prms[0]), [ParseStrParam]);
functionMap["^"] = params => Parse(params, prms => new PrependCharacterRule(prms[0]), [ParseStrParam]);
functionMap["["] = params => new TruncateLeftRule();
functionMap["]"] = params => new TruncateRightRule();
functionMap["D"] = params => Parse(params, prm => new OmitRangeRule(prm[0], 1), [ParseBase36NumberParam]);
functionMap["x"] = params => Parse(params, prm => new ExtractRangeRule(prm[0], prm[1]), [ParseBase36NumberParam, ParseBase36NumberParam]);
functionMap["O"] = params => Parse(params, prm => new OmitRangeRule(prm[0], prm[1]), [ParseBase36NumberParam, ParseBase36NumberParam]);
functionMap["i"] = params => Parse(params, prm => new InsertAtNRule(prm[0], prm[1]), [ParseBase36NumberParam, ParseStrParam])

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
