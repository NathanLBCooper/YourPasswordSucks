import axios from "axios";
import {AxiosResponse} from "axios";
import {Promise} from "es6-promise";

export class PasswordData {

    constructor(private passwordUrl: string) {}

    public getPasswords(): Promise<string[]> {
        return axios.get(this.passwordUrl)
        .then(function (response) {
            return response.data.split("\n");;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
}
