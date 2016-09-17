import { expect } from "chai";
import { RuleParser } from './ruleParser';
import { RuleFunctionParser } from './RuleFunctionParser';

describe("RuleParser", () => {

    const parser = new RuleParser(new RuleFunctionParser());

    it("Can create rule", () => {
        const rule = parser.parse("r $1");
        expect(rule.transform("ohhi")).to.be.equal("ihho1");
    })

    it("Can create more complex rule", () => {
        const rule = parser.parse("r $1 } f");
        expect(rule.transform("ohhi")).to.be.equal("1ihhoohhi1");
    })

    it("Can create rule with bad functions", () => {
        const rule = parser.parse("r p+ } f");
        expect(rule.transform("ohhi")).to.be.equal("oihhhhio");
    })

    it("Can create rule with nothing", () => {
        const rule = parser.parse("");
        expect(rule.transform("ohhi")).to.be.equal("ohhi");
    })

    it("Can create rule with nothing but bad commands", () => {
        const rule = parser.parse("ohhi");
        expect(rule.transform("ohhi")).to.be.equal("ohhi");
    })
});