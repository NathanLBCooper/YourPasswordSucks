import { expect } from "chai";

import { DuplicateAllCharsRule } from "./duplicateAllCharsRule";

describe("DuplicateAllCharsRule", () => {

    it("Duplicates all chars", () => {
        const rule = new DuplicateAllCharsRule();
        expect(rule.transform("p@ssW0rd")).to.be.equal("pp@@ssssWW00rrdd");
    });

    it("Duplicating empty string does nothing", () => {
        const rule = new DuplicateAllCharsRule();
        expect(rule.transform("p@ssW0rd")).to.be.equal("pp@@ssssWW00rrdd");
    });
});
