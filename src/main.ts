import { PasswordChecker } from "./passwordChecker";

class Main {
    public onSubmitPassword(): void {
        let password = (<HTMLInputElement>document.getElementById("password")).value;
        let checker = new PasswordChecker();
        checker.isPasswordWeak(password).then(result => { 
            document.getElementById("answer").innerText = result ? "Weak password" : "Okay password";
        } );
    }
};

let main = new Main();

window['onSubmitPassword'] = main.onSubmitPassword;
