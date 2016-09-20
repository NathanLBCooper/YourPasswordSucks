import { expect } from "chai";

import { TruncateAtNRule } from "./truncateAtNRule";

describe("TruncateAtNRule", () => {

    it("Truncates at position 6", () => {
        const rule = new TruncateAtNRule(6)
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0");
    });

    it("Truncating at position 0 gives empty string", () => {
        const rule = new TruncateAtNRule(0)
        expect(rule.transform("p@ssW0rd")).to.be.equal("");
    });

    it("Truncating at negative position gives empty string", () => {
        const rule = new TruncateAtNRule(-1)
        expect(rule.transform("p@ssW0rd")).to.be.equal("");
    });

    it("Truncating at 7, end position, removes last character", () => {
        const rule = new TruncateAtNRule(7)
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0r");
    });

    it("Truncating past end does nothing", () => {
        const rule = new TruncateAtNRule(8)
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });
});