import { expect } from "chai";
import * as Moq from "typemoq";
import {Promise} from "es6-promise";

import { PasswordData } from "./data/passwordData";
import { RuleData } from "./data/ruleData";
import { RuleParser } from './rules/ruleParser';
import { RuleFunctionParser } from './rules/ruleFunctionParser';
import { Analyser } from "./analyser";
import { MatchResult } from "./matchResult";
import { PasswordChecker } from "./passwordChecker";

// todo tests for the concurrency Check

/** Basic sanity test of the whole system
 * Find some rules here:
 *  https://raw.githubusercontent.com/hashcat/hashcat/master/rules/dive.rule
 * Find passwords here:
 *  https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/10_million_password_list_top_100.txt
*/
describe("PasswordChecker Integration Tests", () => {

    const rules = [
        ":" ,   // Do Nothing                           password -> password
        "c",    // unknown
        "$1",   // Append character 1 to end            password -> password1
        "} } } }", // Rotates the word right (x4)       password -> wordpass
        "p3",   // Append duplicated word 3 times       password -> passwordpasswordpasswordpassword
        "[",    // Deletes first character              password -> assword
        "$.",   // Append character . to end            password -> password.
        "]",    // Deletes last character               password -> passwor
        "$5",   // Append character 5 to end            password -> password5
        "} } }", // Rotates the word right (x3)         password -> ordpassw
        "r",    // Reverse the entire word              password -> drowssap
        "} ] ] {",  // Rotate right, delete last (x2), rotate left   password -> passwd
        "~40 O61 O42" // unknown, Deletes 1/2 characters, starting at position 6/4  password -> passd
    ];

    const dictionaryPasswords = ["123456", "password", "12345678", "qwerty",
        "123456789", "12345", "1234", "111111", "1234567", "dragon", "123123",
        "baseball", "abc123", "football", "monkey", "letmein", "696969",
        "shadow", "master", "666666", "qwertyuiop", "123321", "mustang",
        "1234567890", "michael", "654321", "pussy", "superman"];

    let passwordDataMock: Moq.Mock<PasswordData>;
    let ruleDataMock: Moq.Mock<RuleData>;
    let checker: PasswordChecker;
    
    beforeEach(function(){
        passwordDataMock = Moq.Mock.ofType(PasswordData);
        passwordDataMock.setup(data => data.getPasswords()).returns(
            () => Promise.resolve(dictionaryPasswords)
            );
        ruleDataMock = Moq.Mock.ofType(RuleData);
        ruleDataMock.setup(data => data.getRules()).returns(
            () => Promise.resolve(rules)
            );
        checker = new PasswordChecker(
            passwordDataMock.object, ruleDataMock.object,
            new RuleParser(new RuleFunctionParser()),
            new Analyser()
            );
    });

    it('password found twice by simple rules', () => {
        return checker.Check(["password"], false).then(
            matches => {
                expect(matches.length).to.be.equal(2);
                expect(matches[0].reason).to.contain(
                    "\"password\" matches \"password\""
                    );
                expect(matches[0].reason).to.contain(
                    "Do Nothing"
                    );
                expect(matches[1].reason).to.contain(
                    "\"password\" matches \"password\""
                    );
                expect(matches[1].reason).to.contain(
                    "Ignored rule"
                    );
            }
            );
    });

    it('supern found by } ] ] {', () => {
        return checker.Check(["supern"], false).then(
            matches => {
                expect(matches.length).to.be.equal(1);
                expect(matches[0].reason).to.contain(
                    "\"supern\" matches \"superman\""
                    );
                expect(matches[0].reason).to.contain(
                    "Rotates the word right\n    Deletes last character\n"+ 
                    "    Deletes last character\n    Rotates the word left"
                    );
            }
            );
    });

    it('passd found by ~40 O61 O42', () => {
        return checker.Check(["passd"], false).then(
            matches => {
                expect(matches.length).to.be.equal(1);
                expect(matches[0].reason).to.contain(
                    "\"passd\" matches \"password\""
                    );
                expect(matches[0].reason).to.contain(
                    "unknown rule: ~40\n" +
                    "    Ommits 1 characters, starting at position 6\n" + 
                    "    Ommits 2 characters, starting at position 4"
                    );
            }
            );
    });
});