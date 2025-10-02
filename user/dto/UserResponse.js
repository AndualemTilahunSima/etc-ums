/**
 * User Response
 */
export default class UserResponse {
    #id;
    #fullName;
    #email;
    #birthDate;
    #role;
    #language;
    #status;
    #createdAt;
    #updatedAt;

    constructor(id, fullName, email, birthDate, role, language, status, createdAt, updatedAt) {
        this.#id = id;
        this.#fullName = fullName;
        this.#email = email;
        this.#birthDate = birthDate;
        this.#role = role;
        this.#language = language;
        this.#status = status;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() { return this.#id; }
    get fullName() { return this.#fullName; }
    get email() { return this.#email; }
    get birthDate() { return this.#birthDate; }
    get role() { return this.#role; }
    get language() { return this.#language; }
    get status() { return this.#status; }
    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }

    // Static factory method
    static toUserResponse(user) {
        return new UserResponse(
            user.id,
            user.fullName,
            user.email,
            user.birthDate,
            user.role,
            user.language,
            user.status,
            user.createdAt,
            user.updatedAt
        );
    }

    toJSON() {
        return {
            id: this.#id,
            fullName: this.#fullName,
            email: this.#email,
            birthDate: this.#birthDate,
            role: this.#role,
            language: this.#language,
            status: this.#status,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        }
    }
}
