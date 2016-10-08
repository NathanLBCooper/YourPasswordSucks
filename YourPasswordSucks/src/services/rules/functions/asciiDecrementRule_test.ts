import { expect } from "chai";

import { AsciiDecrementRule } from "./asciiDecrementRule";

describe("AsciiDecrementRule", () => {

    it("Ascii decrement character @ 1", () => {
        const rule = new AsciiDecrementRule(1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p?ssW0rd");
    });

    it("Ascii decrement character @ -1 does nothing", () => {
        const rule = new AsciiDecrementRule(-1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Ascii decrement character @ 8, past array, does nothing", () => {
        const rule = new AsciiDecrementRule(8);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });
});