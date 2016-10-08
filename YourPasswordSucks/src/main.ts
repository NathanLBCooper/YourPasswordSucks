import { Analyser } from "./services/analyser";
import { PasswordChecker } from "./services/passwordChecker";
import { PasswordData } from "./services/data/passwordData";
import { RuleData } from "./services/data/ruleData";
import { NoopRule } from "./services/rules/functions/noopRule";
import { RuleFunctionParser } from './services/rules/ruleFunctionParser';
import { RuleParser } from './services/rules/ruleParser';

function SetAnswer(answer: string) {
    document.getElementById("answer").innerText = answer;
}

function GetPasswordInput(): string {
    return (<HTMLInputElement>document.getElementById("password")).value;
}

class Main {
    public onSubmitPassword(): void {
        SetAnswer("calculating");
        const password = GetPasswordInput();

        const passwordChecker = new PasswordChecker(
            new PasswordData(), new RuleData(), new RuleParser(new RuleFunctionParser())
            );

        passwordChecker.Check([password]).then( matches => {
            let answer = matches.length !== 0 ? "Weak password: " : "Okay password: ";
            for(const match of matches) {
                answer += "/n" + match.reason || "";
            }
            SetAnswer(answer);
        });
    }
};

const main = new Main();

window['onSubmitPassword'] = main.onSubmitPassword;
