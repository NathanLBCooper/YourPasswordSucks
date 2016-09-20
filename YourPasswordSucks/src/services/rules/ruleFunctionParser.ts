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
import { OverwriteAtNRule } from "./functions/OverwriteAtNRule";
import { TruncateAtNRule } from "./functions/TruncateAtNRule";
import { ReplaceRule } from "./functions/ReplaceRule";

function CheckExists<T>(param: T): T {
    // Test for bad values and reading beyond the arrays
    if (param == null) {
        throw new Error(param + "is not a valid value." + 
        "There probably weren't enough parameters supplied");
    }

    return param;
}

function ParseBase36Number(param: string): number {
    // Base 36 is 1-9-A-Z
    CheckExists(param);
    const num = parseInt(param, 36);
    if(isNaN(num)) {
        throw new Error(param + "is not a valid number");
    }

    return num;
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
functionMap["p"] = params => new DuplicateRule(ParseBase36Number(params[0]));
functionMap["f"] = params => new DuplicateReverseRule();
functionMap["{"] = params => new RotateLeftRule();
functionMap["}"] = params => new RotateRightRule();
functionMap["$"] = params => new AppendCharacterRule(CheckExists(params[0]));
functionMap["^"] = params => new PrependCharacterRule(CheckExists(params[0]));
functionMap["["] = params => new TruncateLeftRule();
functionMap["]"] = params => new TruncateRightRule();
functionMap["D"] = params => new OmitRangeRule(ParseBase36Number(params[0]), 1);
functionMap["x"] = params => new ExtractRangeRule(ParseBase36Number(params[0]), ParseBase36Number(params[1]));
functionMap["O"] = params => new OmitRangeRule(ParseBase36Number(params[0]), ParseBase36Number(params[1]));
functionMap["i"] = params => new InsertAtNRule(ParseBase36Number(params[0]),CheckExists(params[1]));
functionMap["o"] = params => new OverwriteAtNRule(ParseBase36Number(params[0]),CheckExists(params[1]));
functionMap["'"] = params => new TruncateAtNRule(ParseBase36Number(params[0]));
functionMap["s"] = params => new ReplaceRule(CheckExists(params[0]), CheckExists(params[1]));
functionMap["@"] = params => new ReplaceRule(CheckExists(params[0]), "");

export class RuleFunctionParser {
    // todo turns one rule function (eg "{") into an IRule
    public parse(functionStr: string): IRule {
        const functionStrArr = functionStr.split("");
        const firstChar = functionStrArr[0];
        if(!(firstChar in functionMap)) {
            // unknown
            return new NoopRule();
        }

        try {
            return functionMap[firstChar](
                _.slice(functionStrArr, 1, functionStrArr.length)
                );
        }
        catch (error) {
            return new NoopRule();
        }
    }
}
