import { expect } from "chai";
import { RuleFunctionParser } from './ruleFunctionParser';

describe("RuleFunctionParser", () => {

  const parser = new RuleFunctionParser();

  it("Can create rule function", () => {
    const ruleStr = "r";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ihho");
    expect(parser.canParse(ruleStr)).to.be.equal(true);
  })

  it("Can create another rule function", () => {
    const ruleStr = "{";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("hhio");
    expect(parser.canParse(ruleStr)).to.be.equal(true);
  })
  
  it("Can create noop rule function", () => {
    const ruleStr = ":";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi");
    expect(parser.canParse(ruleStr)).to.be.equal(true);
  })

  it("Can create rule function with string param", () => {
    const ruleStr = "$3";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi3");
    expect(parser.canParse(ruleStr)).to.be.equal(true);
  })

  it("Can create rule function with number param", () => {
    const ruleStr = "p3";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhiohhiohhiohhi");
    expect(parser.canParse(ruleStr)).to.be.equal(true);
  })

  it("Can create rule function with two number params", () => {
    const ruleStr = "O14";
    expect(parser.parse(ruleStr).transform("p@ssW0rd")).to.be.equal("p0rd");
    expect(parser.canParse(ruleStr)).to.be.equal(true);
  })

  it("Can create rule function with letter number param", () => {
    const ruleStr = "pZ";
    expect(parser.parse(ruleStr).transform("a")).to.be.equal("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(parser.canParse(ruleStr)).to.be.equal(true);
  })

  it("Unknown first char creates noop rule function", () => {
    const ruleStr = "å";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi");
    expect(parser.canParse(ruleStr)).to.be.equal(false);
  })

  it("Unneeded params are discarded", () => {
    const ruleStr = "r3";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ihho");
    expect(parser.canParse(ruleStr)).to.be.equal(true);
  })

  it("Missing params returns no-op", () => {
    const ruleStr = "$";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi");
    expect(parser.canParse(ruleStr)).to.be.equal(false);
  })

  it("Missing number param returns no-op", () => {
    const ruleStr = "p";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi");
    expect(parser.canParse(ruleStr)).to.be.equal(false);
  })

  it("Bad number param returns no-op", () => {
    const ruleStr = "p+";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi");
    expect(parser.canParse(ruleStr)).to.be.equal(false);
  })

  it("No parameters returns no-op", () => {
    const ruleStr = "";
    expect(parser.parse(ruleStr).transform("ohhi")).to.be.equal("ohhi");
    expect(parser.canParse(ruleStr)).to.be.equal(false);
    // but null will throw
  })
});