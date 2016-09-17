import { expect } from "chai";

import { DuplicateRule } from "./duplicateRule";

describe("DuplicateRule", () => {

    it("duplicates 1 times", () => {
        const rule = new DuplicateRule(1);
        expect(rule.transform("heellleo")).to.be.equal("heellleoheellleo");
    })

    it("duplicates 3 times", () => {
        const rule = new DuplicateRule(3);
        expect(rule.transform("heellleo")).to.be.equal("heellleoheellleoheellleoheellleo");
    })

    it("duplicates 0 times", () => {
        const rule = new DuplicateRule(0);
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })

    it("empty string for negative input", () => {
        const rule = new DuplicateRule(-1);
        expect(rule.transform("heellleo")).to.be.equal("");
    })
});