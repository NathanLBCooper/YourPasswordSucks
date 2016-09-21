import { expect } from "chai";

import { DuplicateWordRule } from "./duplicateRule";

describe("DuplicateWordRule", () => {

    it("duplicates 1 times", () => {
        const rule = new DuplicateWordRule(1);
        expect(rule.transform("heellleo")).to.be.equal("heellleoheellleo");
    })

    it("duplicates 3 times", () => {
        const rule = new DuplicateWordRule(3);
        expect(rule.transform("heellleo")).to.be.equal("heellleoheellleoheellleoheellleo");
    })

    it("duplicates 36 times", () => {
        const rule = new DuplicateWordRule(36);
        expect(rule.transform("a")).to.be.equal("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    })

    it("duplicates 0 times", () => {
        const rule = new DuplicateWordRule(0);
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })

    it("empty string for negative input", () => {
        const rule = new DuplicateWordRule(-1);
        expect(rule.transform("heellleo")).to.be.equal("");
    })
});