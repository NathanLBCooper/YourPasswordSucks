import axios from "axios";
import {AxiosResponse} from "axios";
import {Promise} from "es6-promise";

const ruleFileLocation =
    "https://raw.githubusercontent.com/hashcat/hashcat/master/rules/dive.rule"

export class RuleData {
    public getLowerCasePasswords(): Promise<string[]> {
        return axios.get(ruleFileLocation)
        .then(function (response) {
            return response.data.split("\n");
            // todo remove lines starting with #
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
}
