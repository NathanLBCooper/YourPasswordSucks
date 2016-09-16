import {Promise} from "es6-promise";
import * as _ from "lodash";

import { CommonPasswords } from "./commonPasswords";

export class PasswordChecker {
    private commonPasswords: CommonPasswords;
    
    constructor() {
        this.commonPasswords = new CommonPasswords();
    }

    public isPasswordWeak(password: string): Promise<boolean> {
        return this.commonPasswords.get().then(passwords => { 
            return passwords.indexOf(password) !== -1;
        });
    }
}