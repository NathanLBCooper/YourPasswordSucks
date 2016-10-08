import { expect } from "chai";
import { RuleParser } from './ruleParser';
import { RuleFunctionParser } from './RuleFunctionParser';

describe("RuleParser", () => {

    const parser = new RuleParser(new RuleFunctionParser());

    it("Can create rule", () => {
        const ruleStr = "r $1";
        expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ihho1");
        expect(parser.canParse(ruleStr)).to.be.equal(true);
    });

    it("Can create more complex rule", () => {
        const ruleStr = "r $1 } f";
        expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("1ihhoohhi1");
        expect(parser.canParse(ruleStr)).to.be.equal(true);
    });

    it("Can create rule with bad functions", () => {
        const ruleStr = "r p+ } f";
        expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("oihhhhio");
        expect(parser.canParse(ruleStr)).to.be.equal(false);
    });

    it("Can create rule with nothing", () => {
        const ruleStr = "";
        expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi");
        expect(parser.canParse(ruleStr)).to.be.equal(false);
    });

    it("Can create rule with command with too many parameters", () => {
        const ruleStr = "o11i";
        expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("o1hi");
        expect(parser.canParse(ruleStr)).to.be.equal(true);
    });

    it("Can create rule with nothing but bad commands", () => {
        const ruleStr = "öhhi";
        expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi");
        expect(parser.canParse(ruleStr)).to.be.equal(false);
    });
});