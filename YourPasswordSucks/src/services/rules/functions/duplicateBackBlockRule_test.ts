import { expect } from "chai";

import { DuplicateBackBlockRule } from "./duplicateBackBlockRule";

describe("duplicateBackBlockRule", () => {

    it("Duplicates last 2 characters", () => {
        const rule = new DuplicateBackBlockRule(2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rdrd");
    });

    it("Duplicates last -2 characters does nothing", () => {
        const rule = new DuplicateBackBlockRule(-2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Duplicates last 10 (too long) characters duplicates all", () => {
        const rule = new DuplicateBackBlockRule(8);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rdp@ssW0rd");
    });
});