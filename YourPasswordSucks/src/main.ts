import { Analyser } from "./services/analyser";
import { PasswordChecker } from "./services/passwordChecker";
import { PasswordData } from "./services/data/passwordData";
import { RuleData } from "./services/data/ruleData";
import { NoopRule } from "./services/rules/functions/noopRule";
import { RuleFunctionParser } from "./services/rules/ruleFunctionParser";
import { RuleParser } from "./services/rules/ruleParser";
import { RuleCompatibility, CompatibilityResult } from "./ruleCompatibility";
import { ProgressLogger } from "./services/progressLogger";

const passwordUrl =
    "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/" +
    "10_million_password_list_top_100000.txt";
const ruleFileLocation =
    "https://raw.githubusercontent.com/hashcat/hashcat/master/rules/dive.rule"
const workChunkSize = 10000000; 

/** On 1 password (password123), 1000 passwords in dictionary and dive rules (about 100 000 rules):
 *  100 000 took 45 seconds, 1000000 took 25 seconds, 10000000 took 20 seconds
 * 
 * On 1 password (password123), 10 000 passwords in dictionary and dive rules:
 * 10 000 000 took 7 seconds (what? no.)
 * 
 * On 1 password (password123), 100 000 passwords in dictionary and dive rules:
 * 10 000 000 took 6 minutes 18 seconds.
 * That's about 10 billion comparisons and many more rule function transforms btw
 * 
 * Maybe 100 000 is too many rules? The password list go to 1 000 000, which would take about an hour?
*/

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

        const progressLogger = new ProgressLogger(SetProgress);

        passwordChecker.CheckConcurrently([password], progressLogger, workChunkSize).then( matches => {
            let answer = matches.length !== 0 ? "Weak password: " : "Okay password: ";
            for(const match of matches) {
                answer += "\n\nMATCH:\n" + match.reason || "";
            }
            SetAnswer(answer);
            StopCalculating();
        });

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

function SetAnswer(answer: string): void {
    document.getElementById("answer").innerText = answer;
}

function SetProgress(progress: string): void {
    document.getElementById("progress").innerText = progress;
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