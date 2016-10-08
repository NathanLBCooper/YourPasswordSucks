import { expect } from "chai";

import { SwapRule } from "./swapRule";

describe("SwapRule", () => {

    it("Swaps position 3 and 4", () => {
        const rule = new SwapRule(3,4);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@sWs0rd");
    });

    it("Swaps position 4 and 3", () => {
        const rule = new SwapRule(4,3);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@sWs0rd");
    });

    it("Swapping position 3 and 3 does nothing", () => {
        const rule = new SwapRule(3,3);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0rd");
    });

    it("Swaps position 0 and 2, at ends of array", () => {
        const rule = new SwapRule(0,2);
        expect(rule.transform("foz")).to.be.equal("zof");
    });

    it("Swapping position 0 and 3, beyond array, does nothing", () => {
        const rule = new SwapRule(0,3);
        expect(rule.transform("foz")).to.be.equal("foz");
    });

    it("Swapping position -1, negative, and 2, swaps the last element with the third", () => {
        const rule = new SwapRule(-1,2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@dsW0rs");
    });

    it("Swapping position -1, negative, and -2, negative, swaps the last two elements", () => {
        const rule = new SwapRule(-1,-2);
        expect(rule.transform("p@ssW0rd")).to.be.equal("p@ssW0dr");
    });

    it("Swapping position -4, negative but beyond array, and 1, does nothing", () => {
        const rule = new SwapRule(-4,1);
        expect(rule.transform("foz")).to.be.equal("foz");
    });
});