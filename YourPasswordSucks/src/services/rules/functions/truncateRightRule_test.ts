import { expect } from "chai";

import { TruncateRightRule } from "./TruncateRightRule";

describe("TruncateRightRule", () => {

    it("Truncates right", () => {
        const rule = new TruncateRightRule();
        expect(rule.transform("heellleo")).to.be.equal("heellle");
    })

    it("Empty string does nothing", () => {
        const rule = new TruncateRightRule();
        expect(rule.transform("")).to.be.equal("");
    })
});