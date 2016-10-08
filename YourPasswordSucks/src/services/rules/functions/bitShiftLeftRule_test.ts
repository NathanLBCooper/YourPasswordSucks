import { expect } from "chai";

import { BitShiftLeftRule } from "./bitShiftLeftRule";

describe("BitShiftLeftRule", () => {

    it("Bitwise shift left character @ 2", () => {
        const rule = new BitShiftLeftRule(2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@æsW0rd");
    });

    it("Bitwise shift left character @ -1 does nothing", () => {
        const rule = new BitShiftLeftRule(-1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Bitwise shift left character @ 8, past array, does nothing", () => {
        const rule = new BitShiftLeftRule(8);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });
});