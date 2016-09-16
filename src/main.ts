import axios from 'axios';

class Greeter {
    constructor() { }
    greet(): any {
        return axios.get('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/10_million_password_list_top_100.txt')
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }
};

var greeter = new Greeter();
    
greeter.greet().then(function(response) {
    document.body.innerHTML = response.data;
})
