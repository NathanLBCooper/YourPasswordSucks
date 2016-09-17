import { expect } from "chai";

import { TruncateLeftRule } from "./TruncateLeftRule";

describe("TruncateLeftRule", () => {

    it("Truncates left", () => {
        const rule = new TruncateLeftRule();
        expect(rule.transform("heellleo")).to.be.equal("eellleo");
    })

    it("Empty string does nothing", () => {
        const rule = new TruncateLeftRule();
        expect(rule.transform("")).to.be.equal("");
    })
});