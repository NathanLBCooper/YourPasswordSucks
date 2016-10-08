import { expect } from "chai";

import { ReplaceCharRule } from "./replaceCharRule";

describe("ReplaceCharRule", () => {

    it("Replaces character at 1 with value at 2", () => {
        const rule = new ReplaceCharRule(1,1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("psssW0rd");
    });

    it("Replaces character at 1 with value at 0", () => {
        const rule = new ReplaceCharRule(1,-1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("ppssW0rd");
    });

    it("Replaces character at -1, negative, with value at 1 does nothing", () => {
        const rule = new ReplaceCharRule(-1, 2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Replaces character at 8, past array, with value at 1 does nothing", () => {
        const rule = new ReplaceCharRule(8, -7);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });
});