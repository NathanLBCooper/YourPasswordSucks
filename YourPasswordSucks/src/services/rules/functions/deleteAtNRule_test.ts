import { expect } from "chai";

import { DeleteAtNRule } from "./deleteAtNRule";

describe("DeleteAtNRule", () => {

    it("Removes at N", () => {
        const rule = new DeleteAtNRule(3);
        expect(rule.transform("heellleo")).to.be.equal("heelleo");
    })

    it("Removes at 0", () => {
        const rule = new DeleteAtNRule(0);
        expect(rule.transform("heellleo")).to.be.equal("eellleo");
    })

    it("Removes at end", () => {
        const rule = new DeleteAtNRule(3);
        expect(rule.transform("heel")).to.be.equal("hee");
    })

    it("Removing past bounds is a no-op", () => {
        const rule = new DeleteAtNRule(10);
        expect(rule.transform("heel")).to.be.equal("heel");
    })
});