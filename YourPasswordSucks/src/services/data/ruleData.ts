import axios from "axios";
import {AxiosResponse} from "axios";
import {Promise} from "es6-promise";
import * as _ from "lodash";

const comment = "#";

function removeLineComments(lines: string[]): string[] {
        return _.remove(lines, function(line) {
                const chars = line.trim().split("");
                return (chars.length === 0 || chars[0] !== comment);
            });
    }

export class RuleData {
    
    constructor(private ruleUrl: string) {}

    public getRules(): Promise<string[]> {
        return axios.get(this.ruleUrl)
        .then(function (response) {
            // Add do-nothing rule to any rule file
            return [":"].concat(removeLineComments(response.data.split("\n")));
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
}
