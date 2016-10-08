import { PasswordChecker } from "./services/checkers/passwordChecker";
import { PasswordData } from "./services/data/passwordData";
import { RuleData } from "./services/data/ruleData";
import { NoopRule } from "./services/rules/functions/noopRule";
import { RuleFunctionParser } from './services/rules/ruleFunctionParser';
import { RuleParser } from './services/rules/ruleParser';

class Main {
    public onSubmitPassword(): void {
        const password = (<HTMLInputElement>document.getElementById("password")).value;

        const passwordFetcher = new PasswordData();
        const ruleFetcher = new RuleData();

        const ruleFunctionParser = new RuleFunctionParser();
        const ruleParser = new RuleParser(ruleFunctionParser);

        ruleFetcher.getRules().then(fetchedRules => {
            var rules = fetchedRules.map(fetched => ruleParser.parse(fetched));
            passwordFetcher.getPasswords().then(
                fetchedPasswords => {
                    const checker = new PasswordChecker(rules, fetchedPasswords);

                    const result = checker.isMatch(password);
                    let answer = result.isMatch ? "Weak password: " : "Okay password: ";
                    answer += " " + result.reason || "";
                    document.getElementById("answer").innerText = answer;
                }
            )
        });
    }
};

const main = new Main();

window['onSubmitPassword'] = main.onSubmitPassword;
