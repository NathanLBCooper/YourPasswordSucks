import {AxiosResponse} from 'axios';
import {Promise} from 'es6-promise';

import { CommonPasswords } from './commonPasswords';

class Main {
    public run() {
        let passwords = new CommonPasswords();
        passwords.get().then(response => {
            document.body.innerHTML = JSON.stringify(response);
        })
    }
};

new Main().run();
