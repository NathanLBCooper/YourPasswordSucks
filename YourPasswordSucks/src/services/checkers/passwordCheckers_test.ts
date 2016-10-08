import { expect } from "chai";
import * as Moq from "typemoq";

import { PasswordChecker } from "./passwordChecker";
import { NoopRule } from "../rules/functions/noopRule";

describe("PasswordChecker", () => {

  const passwordDictionary = ["password1", "secretsquirrel", "12345", "kanelbullar", "kanelbullar"];
  const noop = new NoopRule();
  const noRules = [ noop ];

  it("One exact match is found", () => {
    const checker = new PasswordChecker(noRules, passwordDictionary);
    const result = checker.isMatch("secretsquirrel", false);
    expect(result.length).to.be.equal(1);
    expect(result[0].reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"Do Nothing\""
        );
  });

  it("One exact match is found, Array", () => {
    const checker = new PasswordChecker(noRules, passwordDictionary);
    const result = checker.isMatch_Array(["secretsquirrel"], false);
    expect(result.length).to.be.equal(1);
    expect(result[0].reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"Do Nothing\""
        );
  });

  it("Two exact matches are found", () => {
    const checker = new PasswordChecker(noRules, passwordDictionary);
    const result = checker.isMatch("kanelbullar", false);
    expect(result.length).to.be.equal(2);
    expect(result[0].reason).to.be.equal(
        "\"kanelbullar\" matches \"kanelbullar\" in dictionary, with rule \"Do Nothing\""
        );
    expect(result[1].reason).to.be.equal(
        "\"kanelbullar\" matches \"kanelbullar\" in dictionary, with rule \"Do Nothing\""
        );
  });

  it("Two exact matches are found, Array", () => {
    const checker = new PasswordChecker(noRules, passwordDictionary);
    const result = checker.isMatch_Array(["kanelbullar"], false);
    expect(result.length).to.be.equal(2);
    expect(result[0].reason).to.be.equal(
        "\"kanelbullar\" matches \"kanelbullar\" in dictionary, with rule \"Do Nothing\""
        );
    expect(result[1].reason).to.be.equal(
        "\"kanelbullar\" matches \"kanelbullar\" in dictionary, with rule \"Do Nothing\""
        );
  });

  it("No match returns correct result", () => {
    const checker = new PasswordChecker(noRules, passwordDictionary);
    const result = checker.isMatch("correcthorsebatterystaple", false);
    expect(result.length).to.be.equal(0);
  });

  it("No match returns correct result, Array", () => {
    const checker = new PasswordChecker(noRules, passwordDictionary);
    const result = checker.isMatch_Array(["correcthorsebatterystaple"], false);
    expect(result.length).to.be.equal(0);
  });

  it("If second value in dictionary matches, it doesn't check the third when exitOnFirstMatch is true", () => {
    const ruleMock = Moq.Mock.ofType(NoopRule);
    ruleMock.setup(rule => rule.transform(Moq.It.isAnyString())).returns(str => noop.transform(str));
    ruleMock.setup(rule => rule.toString()).returns(() => "hello!");

    const checker = new PasswordChecker([ruleMock.object], passwordDictionary);
    const result = checker.isMatch("secretsquirrel", true);
    expect(result.length).to.be.equal(1);
    expect(result[0].reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"hello!\""
        );

    ruleMock.verify(rule => rule.transform(Moq.It.isAnyString()), Moq.Times.exactly(2));
  });

  it("If second value in dictionary matches, it doesn't check the third when exitOnFirstMatch is true, Array", () => {
    const ruleMock = Moq.Mock.ofType(NoopRule);
    ruleMock.setup(rule => rule.transform(Moq.It.isAnyString())).returns(str => noop.transform(str));
    ruleMock.setup(rule => rule.toString()).returns(() => "hello!");

    const checker = new PasswordChecker([ruleMock.object], passwordDictionary);
    const result = checker.isMatch_Array(["secretsquirrel"], true);
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

    const checker = new PasswordChecker([ruleMock.object], passwordDictionary);
    const result = checker.isMatch("secretsquirrel", false);
    expect(result.length).to.be.equal(1);
    expect(result[0].reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"hello!\""
        );

    ruleMock.verify(rule => rule.transform(Moq.It.isAnyString()), Moq.Times.exactly(passwordDictionary.length));
  });

  it("If second value in dictionary matches, it still checks the third if exitOnFirstMatch is false, Array", () => {
    const ruleMock = Moq.Mock.ofType(NoopRule);
    ruleMock.setup(rule => rule.transform(Moq.It.isAnyString())).returns(str => noop.transform(str));
    ruleMock.setup(rule => rule.toString()).returns(() => "hello!");

    const checker = new PasswordChecker([ruleMock.object], passwordDictionary);
    const result = checker.isMatch_Array(["secretsquirrel"], false);
    expect(result.length).to.be.equal(1);
    expect(result[0].reason).to.be.equal(
        "\"secretsquirrel\" matches \"secretsquirrel\" in dictionary, with rule \"hello!\""
        );

    ruleMock.verify(rule => rule.transform(Moq.It.isAnyString()), Moq.Times.exactly(passwordDictionary.length));
  });
});