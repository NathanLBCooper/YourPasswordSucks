import { expect } from "chai";

import { AsciiIncrementRule } from "./asciiIncrementRule";

describe("AsciiIncrementRule", () => {

    it("Ascii increment character @ 2", () => {
        const rule = new AsciiIncrementRule(2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@tsW0rd");
    });

    it("Ascii increment character @ -1 does nothing", () => {
        const rule = new AsciiIncrementRule(-1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Ascii increment character @ 8, past array, does nothing", () => {
        const rule = new AsciiIncrementRule(8);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });
});