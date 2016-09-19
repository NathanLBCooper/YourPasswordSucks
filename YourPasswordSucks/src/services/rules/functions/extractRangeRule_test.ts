import { expect } from "chai";

import { ExtractRangeRule } from "./extractRangeRule";

describe("ExtractRangeRule", () => {

    it("Extracts 4 characters, starting at position 0", () => {
        const rule = new ExtractRangeRule(0, 4)
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ss");
    })

    it("Extract 2 chars starting from position 1", () => {
        const rule = new ExtractRangeRule(1,2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("@s");
    })

    it("Extract 3 chars starting from position 0, ie the end", () => {
        const rule = new ExtractRangeRule(5,3);
        expect(rule.transform("heellleo")).to.be.equal("leo");
    })

    it("Extract 8 chars when there are less left, just extracts what it can", () => {
        const rule = new ExtractRangeRule(5,10);
        expect(rule.transform("heellleo")).to.be.equal("leo");
    })

    it("Extract chars from position beyond range gives empty string", () => {
        const rule = new ExtractRangeRule(10,2);
        expect(rule.transform("heellleo")).to.be.equal("");
    })

    it("Extract chars from negative position gives empty string", () => {
        const rule = new ExtractRangeRule(-2,3);
        expect(rule.transform("heellleo")).to.be.equal("");
    })

    it("Extract no chars gives empty string", () => {
        const rule = new ExtractRangeRule(2,0);
        expect(rule.transform("heellleo")).to.be.equal("");
    })

    it("Extract negative chars gives empty string", () => {
        const rule = new ExtractRangeRule(2,-3);
        expect(rule.transform("heellleo")).to.be.equal("");
    })
});
