import { Role } from "../entity/Role.js";
import { Language } from "./Language.js";
import { UserStatus } from "./UserStatus.js";

/**
 * User Domain Entity
 * Contains business logic and validation rules
 */
export default class User {
  #id;
  #fullName;
  #email;
  #birthDate;
  #password;
  #role;
  #language;
  #status;
  #createdAt;
  #updatedAt;

  constructor(fullName, email, birthDate, password, role, language, status) {
    // this.#validateUserData(firstName, lastName, email);
    this.#fullName = fullName;
    this.#email = email;
    this.#birthDate = birthDate;
    this.#password = password;
    this.#role = Role[role];
    this.#language = Language[language];
    if (!status) {
      this.#status = Role[role] == "LIBRARIAN" ? UserStatus.PENDING : "APPROVED";
    } else {
      this.#status = status;
    }
    this.#createdAt = new Date();
    this.#updatedAt = new Date();
  }


  get id() { return this.#id; }
  get fullName() { return this.#fullName; }
  get email() { return this.#email; }
  get birthDate() { return this.#birthDate; }
  get passWord() { return this.#password; }
  get role() { return this.#role; }
  get language() { return this.#language; }
  get status() { return this.#status }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }

  set id(value) { this.#id = value }
  set password(value) { this.#password = value }


  // Static factory method
  static toUser(userRequest) {
    return new User(
      userRequest.fullName,
      userRequest.email,
      userRequest.birthDate,
      userRequest.password,
      userRequest.role,
      userRequest.language,
      userRequest.status
    );
  }

  toJSON() {
    return {
      id: this.#id,
      fullName: this.#fullName,
      email: this.#email,
      birthDate: this.#birthDate,
      password: this.#password,
      role: this.#role,
      language: this.#language,
      status: this.#status,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt
    }
  }
}