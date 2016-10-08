import axios from "axios";
import {AxiosResponse} from "axios";
import {Promise} from "es6-promise";

const passwordFileLocation =
    "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/" +
    "10_million_password_list_top_100.txt";

export class PasswordData {
    public getPasswords(): Promise<string[]> {
        return axios.get(passwordFileLocation)
        .then(function (response) {
            return response.data.split("\n");;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
}
