import { expect } from "chai";

import { DuplicateFrontBlockRule } from "./duplicateFrontBlockRule";

describe("DuplicateFrontBlockRule", () => {

    it("Duplicates first 2 characters", () => {
        const rule = new DuplicateFrontBlockRule(2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@p@ssW0rd");
    });

    it("Duplicates first -2 characters does nothing", () => {
        const rule = new DuplicateFrontBlockRule(-2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Duplicates first 10 (too long) characters duplicates all", () => {
        const rule = new DuplicateFrontBlockRule(8);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rdp@ssW0rd");
    });
});