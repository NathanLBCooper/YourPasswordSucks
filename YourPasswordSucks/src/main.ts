import { PasswordChecker } from "./services/checkers/passwordChecker";
import { PasswordData } from "./services/data/passwordData";
import { NoopRule } from "./services/rules/noopRule";

class Main {
    public onSubmitPassword(): void {
        const password = (<HTMLInputElement>document.getElementById("password")).value;
        const passwordFetcher = new PasswordData();
        const rules = [ new NoopRule() ] // for now no rules

        passwordFetcher.getLowerCasePasswords().then(
            fetchedPasswords => {
                const checker = new PasswordChecker(rules, fetchedPasswords);

                const result = checker.isMatch(password);
                let answer = result.isMatch ? "Weak password: " : "Okay password: ";
                answer += " " + result.reason || "";
                document.getElementById("answer").innerText = answer;
            }
        )
    }
};

const main = new Main();

window['onSubmitPassword'] = main.onSubmitPassword;
