import { expect } from "chai";

import { AppendCharacterRule } from "./appendCharacterRule";

describe("AppendCharacterRule", () => {

    it("Appends character", () => {
        const rule = new AppendCharacterRule("P");
        expect(rule.transform("heellleo")).to.be.equal("heellleoP");
    })
});