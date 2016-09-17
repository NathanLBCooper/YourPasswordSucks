import { MatchChecker } from "./services/checkers/matchChecker";
import { PasswordData } from "./services/data/passwordData";

class Main {
    public onSubmitPassword(): void {
        let password = (<HTMLInputElement>document.getElementById("password")).value;
        let commonPasswords = new PasswordData();
        let checker = new MatchChecker();

        commonPasswords.getLowerCasePasswords().then(
            fetchedPasswords => {
                let result = checker.isMatch(password, fetchedPasswords);
                let answer = result.isMatch ? "Weak password" : "Okay password";
                answer += " " + result.reason || "";
                document.getElementById("answer").innerText = answer;
            }
        )
    }
};

let main = new Main();

window['onSubmitPassword'] = main.onSubmitPassword;
