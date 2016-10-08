import { expect } from "chai";

import { IgnoredRule } from "./ignoredRule";

describe("IgnoredRule", () => {

    it("Does nothing", () => {
        const rule = new IgnoredRule();
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })
});