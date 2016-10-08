import { expect } from "chai";

import { BitShiftRightRule } from "./bitShiftRightRule";

describe("BitShiftRightRule", () => {

    it("Bitwise shift right character @ 2", () => {
        const rule = new BitShiftRightRule(2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@9sW0rd");
    });

    it("Bitwise shift right character @ -1 does nothing", () => {
        const rule = new BitShiftRightRule(-1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Bitwise shift right character @ 8, past array, does nothing", () => {
        const rule = new BitShiftRightRule(8);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });
});