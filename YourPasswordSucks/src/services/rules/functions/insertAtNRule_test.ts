import { expect } from "chai";

import { InsertAtNRule } from "./insertAtNRule";

describe("InsertAtNRule", () => {

    it("Inserts ! at position 4", () => {
        const rule = new InsertAtNRule(4, "!")
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ss!W0rd");
    })

    it("Inserts $ at position 0", () => {
        const rule = new InsertAtNRule(0, "$")
        expect(rule.transform("p@ssW0rd")).to.be.equal("$p@ssW0rd");
    })

    it("Inserts w at position 8, one past the end", () => {
        const rule = new InsertAtNRule(8, "w")
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rdw");
    })

    it("Inserting at negative index does nothing", () => {
        const rule = new InsertAtNRule(-1, "w")
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    })

    it("Inserting at index past end does nothing", () => {
        const rule = new InsertAtNRule(9, "w")
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    })
});