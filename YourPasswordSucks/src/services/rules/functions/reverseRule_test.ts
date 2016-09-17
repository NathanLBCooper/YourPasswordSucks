import { expect } from "chai";

import { ReverseRule } from "./reverseRule";

describe("ReverseRule", () => {

    it("Reverses", () => {
        const rule = new ReverseRule();
        expect(rule.transform("heellleo")).to.be.equal("oellleeh");
    })

    it("Works on empty string", () => {
        const rule = new ReverseRule();
        expect(rule.transform("")).to.be.equal("");
    })

    it("handles at least some unicode", () => {
        const rule = new ReverseRule();
        expect(rule.transform("Lös Måséräbles")).to.be.equal("selbärésåM söL");
    })
});