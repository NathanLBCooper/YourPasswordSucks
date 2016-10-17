import { Analyser } from "./services/analyser";
import { PasswordChecker } from "./services/passwordChecker";
import { PasswordData } from "./services/data/passwordData";
import { RuleData } from "./services/data/ruleData";
import { NoopRule } from "./services/rules/functions/noopRule";
import { RuleFunctionParser } from "./services/rules/ruleFunctionParser";
import { RuleParser } from "./services/rules/ruleParser";
import { RuleCompatibility, CompatibilityResult } from "./ruleCompatibility";

// import Worker = require("worker!./worker");

const passwordUrl =
    "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/" +
    "10_million_password_list_top_100.txt";
const ruleFileLocation =
    "https://raw.githubusercontent.com/hashcat/hashcat/master/rules/dive.rule"

class Main {
    public onSubmitPassword(): void {

        StartCalculating();
        const password = GetPasswordInput();

        const passwordChecker = new PasswordChecker(
            new PasswordData(passwordUrl),
            new RuleData(ruleFileLocation),
            new RuleParser(new RuleFunctionParser()),
            new Analyser()
            );

        passwordChecker.CheckConcurrently([password], true);//.then( matches => {
        //     let answer = matches.length !== 0 ? "Weak password: " : "Okay password: ";
        //     for(const match of matches) {
        //         answer += "/n" + match.reason || "";
        //     }
        //     SetAnswer(answer);
        //     StopCalculating();
        // });

        // todo remove
        StopCalculating();
    }

    public onSubmitCompabilityTest(): void {
        StartCalculating();
        const ruleCompatibility = new RuleCompatibility(
            new RuleData(ruleFileLocation),
            new RuleParser(new RuleFunctionParser()));

        ruleCompatibility.Check().then( result => {
            SetCompabilityResult(result);
            StopCalculating();
        });
    }
};

function SetAnswer(answer: string) {
    document.getElementById("answer").innerText = answer;
}

function GetPasswordInput(): string {
    return (<HTMLInputElement>document.getElementById("password")).value;
}

function SetCompabilityResult(result: CompatibilityResult){
    document.getElementById("compatibilityResults").innerText = result.toString();
}

function StartCalculating() {
    document.getElementById("calculating").style.display = '';
}

function StopCalculating() {
    document.getElementById("calculating").style.display = 'none';
}

const main = new Main();

window['onSubmitPassword'] = main.onSubmitPassword;
window['onSubmitCompabilityTest'] = main.onSubmitCompabilityTest;