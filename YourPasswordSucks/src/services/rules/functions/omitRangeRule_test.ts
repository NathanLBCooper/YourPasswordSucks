import { expect } from "chai";

import { OmitRangeRule } from "./omitRangeRule";

describe("OmitRangeRule", () => {

    it("Remove 2 chars starting from position 1", () => {
        const rule = new OmitRangeRule(1,2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("psW0rd");
    })

    it("Remove 3 chars starting from position 0, from start", () => {
        const rule = new OmitRangeRule(0,3);
        expect(rule.transform("heellleo")).to.be.equal("llleo");
    })

    it("Remove 3 chars starting from position 0, from end", () => {
        const rule = new OmitRangeRule(5,3);
        expect(rule.transform("heellleo")).to.be.equal("heell");
    })

    it("Remove 8 chars when there are less left, just removes what it can", () => {
        const rule = new OmitRangeRule(5,10);
        expect(rule.transform("heellleo")).to.be.equal("heell");
    })

    it("Remove chars from position beyond range does nothing", () => {
        const rule = new OmitRangeRule(10,2);
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })

    it("Remove chars from negative position does nothing", () => {
        const rule = new OmitRangeRule(-2,3);
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })

    it("Remove no chars does nothing", () => {
        const rule = new OmitRangeRule(2,0);
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })

    it("Remove negative chars does nothing", () => {
        const rule = new OmitRangeRule(2,-3);
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })

    // Can this class do Delete at N as well?:

    it("Remove 1 chars at position 3, ie does delete at n", () => {
        const rule = new OmitRangeRule(3,1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@sW0rd");
    })


    it("Removes at 0", () => {
        const rule = new OmitRangeRule(0,1);
        expect(rule.transform("heellleo")).to.be.equal("eellleo");
    })

    it("Removes at end", () => {
        const rule = new OmitRangeRule(3,1);
        expect(rule.transform("heel")).to.be.equal("hee");
    })

    it("Removing past bounds is a no-op", () => {
        const rule = new OmitRangeRule(10,1);
        expect(rule.transform("heel")).to.be.equal("heel");
    })
});