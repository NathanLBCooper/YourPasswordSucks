import { expect } from "chai";

import { RotateLeftRule } from "./rotateLeftRule";

describe("RotateLeftRule", () => {

    it("Rotates left", () => {
        const rule = new RotateLeftRule();
        expect(rule.transform("heellleo")).to.be.equal("eellleoh");
    })
});