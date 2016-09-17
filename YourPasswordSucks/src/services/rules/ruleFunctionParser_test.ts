import { expect } from "chai";
import { RuleFunctionParser } from './ruleFunctionParser';

describe("RuleFunctionParser", () => {

  const parser = new RuleFunctionParser();

  it("Can create rule function", () => {
    const rule = parser.parse("r");
    expect(rule.transform("ohhi")).to.be.equal("ihho");
  })

  it("Can create another rule function", () => {
    const rule = parser.parse("{");
    expect(rule.transform("ohhi")).to.be.equal("hhio");
  })
  
  it("Can create noop rule function", () => {
    const rule = parser.parse(":");
    expect(rule.transform("ohhi")).to.be.equal("ohhi");
  })

  it("Can create rule function with string param", () => {
    const rule = parser.parse("$3");
    expect(rule.transform("ohhi")).to.be.equal("ohhi3");
  })

  it("Can create rule function with number param", () => {
    const rule = parser.parse("p3");
    expect(rule.transform("ohhi")).to.be.equal("ohhiohhiohhiohhi");
  })

  it("Can create rule function with letter number param", () => {
    const rule = parser.parse("pZ");
    expect(rule.transform("a")).to.be.equal("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  })

  it("Unknown first char creates noop rule function", () => {
    const rule = parser.parse("å");
    expect(rule.transform("ohhi")).to.be.equal("ohhi");
  })

  it("Unneeded params are discarded", () => {
    const rule = parser.parse("r3");
    expect(rule.transform("ohhi")).to.be.equal("ihho");
  })

  it("Missing params returns no-op", () => {
    const rule = parser.parse("$");
    expect(rule.transform("ohhi")).to.be.equal("ohhi");
  })

  it("Missing number param returns no-op", () => {
    const rule = parser.parse("p");
    expect(rule.transform("ohhi")).to.be.equal("ohhi");
  })

  it("Bad number param returns no-op", () => {
    const rule = parser.parse("p+");
    expect(rule.transform("ohhi")).to.be.equal("ohhi");
  })

  it("No parameters returns no-op", () => {
    const rule = parser.parse("");
    expect(rule.transform("ohhi")).to.be.equal("ohhi");
    // but null with throw
  })
});