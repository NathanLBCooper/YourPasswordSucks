import { expect } from "chai";
import { CompositeRule } from './compositeRule';
import { ReverseRule } from './functions/reverseRule';
import { AppendCharacterRule } from './functions/appendCharacterRule';

describe("CompositeRule", () => {
    it("Applies rules in turn", () => {
        const rule = new CompositeRule([ new ReverseRule(), new AppendCharacterRule("@")]);
        expect(rule.transform("ohhi")).to.be.equal("ihho@");
    })

    it("Applies zero rules as no-op", () => {
        const rule = new CompositeRule([]);
        expect(rule.transform("ohhi")).to.be.equal("ohhi");
    })

    it("provides decent toString", () => {
        const rule = new CompositeRule([new ReverseRule(), new AppendCharacterRule("@")]);
        expect(rule.toString()).to.be.equal("Rules applied: \n    Reverse the entire word\n    Append character X to end");
    })

    it("provides decent toString for zero rules", () => {
        const rule = new CompositeRule([]);
        expect(rule.toString()).to.be.equal("Rules applied: ");
    })
});