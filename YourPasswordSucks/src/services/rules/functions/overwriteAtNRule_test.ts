import { expect } from "chai";

import { OverwriteAtNRule } from "./overwriteAtNRule";

describe("OverwriteAtNRule", () => {

    it("Overwrites char at position 3 with $", () => {
        const rule = new OverwriteAtNRule(3, "$")
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@s$W0rd");
    })

    it("Overwrites char at position 0 with !", () => {
        const rule = new OverwriteAtNRule(0, "!")
        expect(rule.transform("p@ssW0rd")).to.be.equal("!@ssW0rd");
    })

    it("Overwrites char at position 7, the end, with w", () => {
        const rule = new OverwriteAtNRule(7, "w")
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rw");
    })

    it("Overwrites at negative index does nothing", () => {
        const rule = new OverwriteAtNRule(-1, "w")
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    })

    it("Overwrites at index past end does nothing", () => {
        const rule = new OverwriteAtNRule(8, "w")
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    })
});