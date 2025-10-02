import UserBadRequestError from "../error/UserBadRequestError.js"
/**
 * User Request
 */
export default class UserRequest {
    #fullName;
    #email;
    #birthDate;
    #password;
    #role;
    #language;
    #status;

    constructor(data) {

        this.#fullName = data.fullName;
        this.#birthDate = data.birthDate;
        this.#password = data.password;
        this.#email = data.email;
        this.#role = data.role;
        this.#language = data.language;
        this.#status=data.status;
    }


    get fullName() { return this.#fullName; }
    get email() { return this.#email; }
    get birthDate() { return this.#birthDate; }
    get password() { return this.#password; }
    get role() { return this.#role; }
    get language() { return this.#language; }
    get status(){return this.#status;}

    static fromRequest(req) {

        const { body } = req;

        if (!body || typeof body !== 'object') {
            throw new UserBadRequestError('Invalid request data');
        }

        this.#validateEmail(body);
        this.#validateFullName(body);
        this.#validateBirthDate(body);
        this.#validatePassword(body);
        this.#validateRole(body);
        this.#validateLanguage(body);


        return new UserRequest(body);
    }

    static updateRequest(req) {

        const { body } = req;

        this.#validateFullName(body);
        this.#validateBirthDate(body);
        this.#validateStatus(body);

        return new UserRequest(body);


    }

    static #validateEmail(data) {
        if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
            throw new UserBadRequestError('Email is required and must be a non-empty string');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new UserBadRequestError('Invalid email format');
        }
    }

    static #validateFullName(data) {
        if (!data.fullName) {
            throw new UserBadRequestError('FullName is required');
        }
    }

    static #validateBirthDate(data) {
        if (!data.birthDate) {
            throw new UserBadRequestError('BirthDate is required');
        }
    }

    static #validatePassword(data) {
        if (!data.password) {
            throw new UserBadRequestError('Password is required');
        }
    }
    static #validateRole(data) {
        if (!data.role) {
            throw new UserBadRequestError('Role is required');
        }
    }
    static #validateLanguage(data) {
        if (!data.language) {
            throw new UserBadRequestError('Language is required');
        }
    }
    static #validateStatus(data) {
        if (!data.status) {
            throw new UserBadRequestError('Status is required');
        }
    }

}


