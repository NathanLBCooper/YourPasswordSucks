import { expect } from "chai";

import { PrependCharacterRule } from "./prependCharacterRule";

describe("PrependCharacterRule", () => {

    it("Prepends character", () => {
        const rule = new PrependCharacterRule("Q");
        expect(rule.transform("heellleo")).to.be.equal("Qheellleo");
    })
});