import { expect } from "chai";

import { NoopRule } from "./noopRule";

describe("NoopRule", () => {

    it("Does nothing", () => {
        const rule = new NoopRule();
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })
});