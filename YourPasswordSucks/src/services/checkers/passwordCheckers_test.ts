import { expect } from "chai";
import * as Moq from "typemoq";

import { PasswordChecker } from "./passwordChecker";
import { NoopRule } from "../rules/functions/noopRule";

describe("PasswordChecker", () => {

  const passwordDictionary = ["password1", "secretsquirrel", "12345"];
  const noop = new NoopRule();
  const noRules = [ noop ];

  it("Exact match is found", () => {
    const checker = new PasswordChecker(noRules, passwordDictionary);
    const result = checker.isMatch("secretsquirrel");
    expect(result.isMatch).to.be.equal(true);
    expect(result.reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"Do Nothing\""
        );
  })

  it("No match returns correct result", () => {
    const checker = new PasswordChecker(noRules, passwordDictionary);
    const result = checker.isMatch("correcthorsebatterystaple");
    expect(result.isMatch).to.be.equal(false);
    expect(result.reason).to.be.equal("no match");
  })

  it("If second value in dictionary matches, it doesn't check the third", () => {
    const ruleMock = Moq.Mock.ofType(NoopRule);
    ruleMock.setup(rule => rule.transform(Moq.It.isAnyString())).returns(str => noop.transform(str));
    ruleMock.setup(rule => rule.toString()).returns(() => "hello!");

    const checker = new PasswordChecker([ruleMock.object], passwordDictionary);
    const result = checker.isMatch("secretsquirrel");
    expect(result.isMatch).to.be.equal(true);
    expect(result.reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"hello!\""
        );

    ruleMock.verify(rule => rule.transform(Moq.It.isAnyString()), Moq.Times.exactly(2));
  })
});