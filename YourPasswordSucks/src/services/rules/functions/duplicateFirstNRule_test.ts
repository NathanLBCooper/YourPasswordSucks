import { expect } from "chai";

import { DuplicateFirstNRule } from "./duplicateFirstNRule";

describe("DuplicateFirstNRule", () => {

    it("Duplicates the first char 2 times", () => {
        const rule = new DuplicateFirstNRule(2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("ppp@ssW0rd");
    });

    it("Duplicates the first char 1 times", () => {
        const rule = new DuplicateFirstNRule(1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("pp@ssW0rd");
    });

    it("Duplicating the first char 0 times does nothing", () => {
        const rule = new DuplicateFirstNRule(0);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Duplicating the first char a negative number of times does nothing", () => {
        const rule = new DuplicateFirstNRule(-1);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Duplicating empty string does nothing", () => {
        const rule = new DuplicateFirstNRule(4);
        expect(rule.transform("")).to.be.equal("");
    });
});
