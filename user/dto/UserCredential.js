export default class UserCredential {
    #email;
    #password;

    constructor(data) {
        this.#email = data.email;
        this.#password = data.password;
    }

    get email() { return this.#email; }
    get password() { return this.#password; }


    static fromRequest(req) {
        console.log(req.body)
        return new UserCredential(req.body);
    }
}