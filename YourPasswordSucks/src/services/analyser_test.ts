import { expect } from "chai";
import * as Moq from "typemoq";

import { Analyser } from "./analyser";
import { NoopRule } from "./rules/functions/noopRule";

describe("Analyser", () => {

  const passwordDictionary = ["password1", "secretsquirrel", "12345", "kanelbullar", "kanelbullar"];
  const noop = new NoopRule();
  const noRules = [ noop ];
  const analyser = new Analyser();

  it("One exact match is found", () => {
    const result = analyser.getMatches(["secretsquirrel"], noRules, passwordDictionary, false);
    expect(result.length).to.be.equal(1);
    expect(result[0].reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"Do Nothing\""
        );
  });

  it("Two exact matches are found", () => {
    const result = analyser.getMatches(["kanelbullar"], noRules, passwordDictionary, false);
    expect(result.length).to.be.equal(2);
    expect(result[0].reason).to.be.equal(
        "\"kanelbullar\" matches \"kanelbullar\" in dictionary, with rule \"Do Nothing\""
        );
    expect(result[1].reason).to.be.equal(
        "\"kanelbullar\" matches \"kanelbullar\" in dictionary, with rule \"Do Nothing\""
        );
  });

  it("No match returns correct result", () => {
    const result = analyser.getMatches(["correcthorsebatterystaple"], noRules, passwordDictionary, false);
    expect(result.length).to.be.equal(0);
  });

  it("If second value in dictionary matches, it doesn't check the third when exitOnFirstMatch is true", () => {
    const ruleMock = Moq.Mock.ofType(NoopRule);
    ruleMock.setup(rule => rule.transform(Moq.It.isAnyString())).returns(str => noop.transform(str));
    ruleMock.setup(rule => rule.toString()).returns(() => "hello!");

    const result = analyser.getMatches(["secretsquirrel"], [ruleMock.object], passwordDictionary, true);
    expect(result.length).to.be.equal(1);
    expect(result[0].reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"hello!\""
        );

    ruleMock.verify(rule => rule.transform(Moq.It.isAnyString()), Moq.Times.exactly(2));
  });

  it("If second value in dictionary matches, it still checks the third if exitOnFirstMatch is false", () => {
    const ruleMock = Moq.Mock.ofType(NoopRule);
    ruleMock.setup(rule => rule.transform(Moq.It.isAnyString())).returns(str => noop.transform(str));
    ruleMock.setup(rule => rule.toString()).returns(() => "hello!");

    const result = analyser.getMatches(["secretsquirrel"], [ruleMock.object], passwordDictionary, false);
    expect(result.length).to.be.equal(1);
    expect(result[0].reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"hello!\""
        );

    ruleMock.verify(rule => rule.transform(Moq.It.isAnyString()), Moq.Times.exactly(passwordDictionary.length));
  });
});