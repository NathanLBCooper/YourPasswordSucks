import { expect } from "chai";

import { DuplicateLastNRule } from "./duplicateLastNRule";

describe("DuplicateLastNRule", () => {

    it("Duplicates the first char 2 times", () => {
        const rule = new DuplicateLastNRule(2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rddd");
    });

    it("Duplicates the first char 1 times", () => {
        const rule = new DuplicateLastNRule(1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rdd");
    });

    it("Duplicating the first char 0 times does nothing", () => {
        const rule = new DuplicateLastNRule(0);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Duplicating the first char a negative number of times does nothing", () => {
        const rule = new DuplicateLastNRule(-1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Duplicating empty string does nothing", () => {
        const rule = new DuplicateLastNRule(4);
        expect(rule.transform("")).to.be.equal("");
    });
});
