import { PasswordChecker } from "./passwordChecker";

class Main {
    public onSubmitPassword(): void {
        let password = document.getElementById("password").innerText;
        let checker = new PasswordChecker();
        checker.isPasswordWeak(password).then(result => { 
            document.getElementById("answer").innerText = result ? "Weak password" : "Okay password";
        } );
    }
};

let main = new Main();

window['onSubmitPassword'] = main.onSubmitPassword;
