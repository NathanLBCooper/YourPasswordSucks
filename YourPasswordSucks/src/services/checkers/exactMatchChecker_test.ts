import { ExactMatchChecker } from './exactMatchChecker';
import { expect } from 'chai';

describe('ExactMatchChecker', () => {

  const passwordDictionary = ["password1", "secretsquirrel", "12345"];
  const checker = new ExactMatchChecker();

  it('Exact match is found', () => {
    const result = checker.isMatch("secretsquirrel", passwordDictionary);
    expect(result.isMatch).to.be.equal(true);
    expect(result.reason).to.be.equal("Exact match with secretsquirrel");
  })

  it('No match is returns correct result', () => {
    const result = checker.isMatch("corrrecthorsebatterystaple", passwordDictionary);
    expect(result.isMatch).to.be.equal(false);
    expect(result.reason).to.be.equal(undefined);
  })
});