import { Analyser } from "./services/analyser";
import { AnalysisWork } from "./services/analysisWork";
import { RuleFunctionParser } from "./services/rules/ruleFunctionParser";
import { RuleParser } from "./services/rules/ruleParser";
import { MatchResult } from "./services/matchResult";

/** Using window.onmessage and declaring postmessage here.
 * This is wrong because we're inside a webworker.
 * Getting away with it though.
*/
declare function postMessage(data: any) : void;

self.onmessage = event => {

    const ruleParser = new RuleParser(new RuleFunctionParser());
    const analyser = new Analyser();

    const work: AnalysisWork = event.data;
    const rules = work.ruleSet.map(rule => ruleParser.parse(rule));

    const matches: MatchResult[] =
        analyser.getMatches(work.passwords, rules, work.passwordDictionary, true);

    postMessage(matches);
}
