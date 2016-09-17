import { expect } from "chai";

import { DuplicateReverseRule } from "./duplicateReverseRule";

describe("DuplicateReverseRule", () => {

    it("Duplicates and reverses", () => {
        const rule = new DuplicateReverseRule();
        expect(rule.transform("heellleo")).to.be.equal("heellleooellleeh");
    })

    it("handles at least some unicode", () => {
        const rule = new DuplicateReverseRule();
        expect(rule.transform("Lös Måséräbles")).to.be.equal("Lös MåséräblesselbärésåM söL");
    })
});