import { expect } from "chai";

import { ReplaceRule } from "./replaceRule";

describe("ReplaceRule", () => {

    it("Replaces all s with $", () => {
        const rule = new ReplaceRule("s","$");
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@$$W0rd");
    });

    it("Purge all instances of 0", () => {
        const rule = new ReplaceRule("0","");
        expect(rule.transform("p00sW0rd")).to.be.equal("psWrd");
    });

    it("Replacing absent char does nothing", () => {
        const rule = new ReplaceRule("Q","x");
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Replacing empty string does nothing", () => {
        const rule = new ReplaceRule("","x");
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Replacing a char with itself does nothing", () => {
        const rule = new ReplaceRule("s","s");
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });
});