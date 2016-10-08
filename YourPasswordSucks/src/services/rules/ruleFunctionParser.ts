import * as _ from "lodash";

import { IRule } from "./iRule";
import { UnknownRule } from "./functions/unknownRule";
import { IgnoredRule } from "./functions/ignoredRule";
import { NoopRule } from "./functions/noopRule";
import { ReverseRule } from "./functions/reverseRule";
import { DuplicateWordRule } from "./functions/duplicateWordRule";
import { DuplicateReverseRule } from "./functions/duplicateReverseRule";
import { RotateLeftRule } from "./functions/rotateLeftRule";
import { RotateRightRule } from "./functions/rotateRightRule";
import { AppendCharacterRule } from "./functions/appendCharacterRule";
import { PrependCharacterRule } from "./functions/prependCharacterRule";
import { TruncateLeftRule } from "./functions/truncateLeftRule";
import { TruncateRightRule } from "./functions/truncateRightRule";
import { OmitRangeRule } from "./functions/omitRangeRule";
import { ExtractRangeRule } from "./functions/extractRangeRule";
import { InsertAtNRule } from "./functions/insertAtNRule";
import { OverwriteAtNRule } from "./functions/overwriteAtNRule";
import { TruncateAtNRule } from "./functions/truncateAtNRule";
import { ReplaceRule } from "./functions/replaceRule";
import { DuplicateFirstNRule } from "./functions/duplicateFirstNRule";
import { DuplicateLastNRule } from "./functions/duplicateLastNRule";
import { DuplicateAllCharsRule } from "./functions/duplicateAllCharsRule";
import { SwapRule } from "./functions/swapRule";
import { BitShiftLeftRule } from "./functions/bitShiftLeftRule";
import { BitShiftRightRule } from "./functions/bitShiftRightRule";


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

/** Implemented compatible functions */
functionMap[":"] = params => new NoopRule();
functionMap["l"] = params => new IgnoredRule();
functionMap["u"] = params => new IgnoredRule();
functionMap["c"] = params => new IgnoredRule();
functionMap["C"] = params => new IgnoredRule();
functionMap["t"] = params => new IgnoredRule();
functionMap["T"] = params => new IgnoredRule();
functionMap["r"] = params => new ReverseRule();
functionMap["d"] = params => new DuplicateWordRule(1);
functionMap["p"] = params => new DuplicateWordRule(ParseBase36Number(params[0]));
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
functionMap["z"] = params => new DuplicateFirstNRule(ParseBase36Number(params[0]));
functionMap["Z"] = params => new DuplicateLastNRule(ParseBase36Number(params[0]));
functionMap["q"] = params => new DuplicateAllCharsRule();

/** Implemented specific functions */
functionMap["E"] = params => new IgnoredRule();
functionMap["k"] = params => new SwapRule(0,1);
functionMap["K"] = params => new SwapRule(-1,-2);
functionMap["*"] = params => new SwapRule(ParseBase36Number(params[0]), ParseBase36Number(params[1]));
functionMap["L"] = params => new BitShiftLeftRule(ParseBase36Number(params[0]));
functionMap["R"] = params => new BitShiftRightRule(ParseBase36Number(params[0]));

export class RuleFunctionParser {
    // todo turns one rule function (eg "{") into an IRule
    public parse(functionStr: string): IRule {
        const functionStrArr = functionStr.split("");
        const firstChar = functionStrArr[0];
        if(!(firstChar in functionMap)) {
            // unknown
            return new UnknownRule(functionStr);
        }

        try {
            return functionMap[firstChar](
                _.slice(functionStrArr, 1, functionStrArr.length)
                );
        }
        catch (error) {
            return new UnknownRule(functionStr);
        }
    }

    /** Code duplication. But be careful combining with parse,
     * parse needs to be performant*/
    public canParse(functionStr: string): boolean {
        const functionStrArr = functionStr.split("");
        const firstChar = functionStrArr[0];
        if(!(firstChar in functionMap)) {
            return false;
        }

        try {
            functionMap[firstChar](
                _.slice(functionStrArr, 1, functionStrArr.length)
                );
        }
        catch (error) {
            return false;
        }

        return true;
    }
}
