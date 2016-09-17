import { expect } from "chai";

import { RotateRightRule } from "./RotateRightRule";

describe("RotateRightRule", () => {

    it("Rotates right", () => {
        const rule = new RotateRightRule();
        expect(rule.transform("heellleo")).to.be.equal("oheellle");
    })
});