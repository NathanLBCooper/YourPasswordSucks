import axios from "axios";
import {AxiosResponse} from "axios";
import {Promise} from "es6-promise";
import * as _ from "lodash";

const ruleFileLocation =
    "https://raw.githubusercontent.com/hashcat/hashcat/master/rules/dive.rule"
const comment = "#";

function removeLineComments(lines: string[]): string[] {
        return _.remove(lines, function(line) {
                const chars = line.trim().split("");
                return (chars.length === 0 || chars[0] !== comment);
            });
    }

export class RuleData {
    public getRules(): Promise<string[]> {
        return axios.get(ruleFileLocation)
        .then(function (response) {
            return removeLineComments(response.data.split("\n"));
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
}
