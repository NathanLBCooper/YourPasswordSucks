import { expect } from "chai";

import { UnknownRule } from "./unknownRule";

describe("UnknownRule", () => {

    it("Does nothing", () => {
        const rule = new UnknownRule("some text");
        expect(rule.transform("heellleo")).to.be.equal("heellleo");
    })
});