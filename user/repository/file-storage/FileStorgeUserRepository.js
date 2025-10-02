import { writeFile, readFile } from "fs/promises";
import currentConfig from "./Config.js";
import UserRepository from "../UserRepository.js";
import UserNotFoundError from "../../Error/UserNotFoundError.js";
import User from "../../entity/User.js";
import path from "path";
import { UserStatus } from "../../entity/UserStatus.js";
import logger from '../../log/logger.js';

const CURRENT_FILE = path.basename(import.meta.url);

export class FileStorageUserRepository extends UserRepository {
    #filePath;


    constructor() {
        super();
        this.#filePath = `${currentConfig.filePath}/users.json`;
    }

    async #getUsers() {
        try {
            console.log(this.#filePath)
            const data = await readFile(this.#filePath, "utf-8");
            return data ? JSON.parse(data) : [];
        } catch (err) {
            if (err.code === "ENOENT") throw err; // return empty if file not found
            throw err;
        }
    }

    async save(user) {

        if (!(user instanceof User)) {
            throw new Error("Invalid user object");
        }

        // console.log(`[${CURRENT_FILE}] Creating new user: ${user}`);

        logger.info(`[${CURRENT_FILE}] Creating new user: ${user}`);

        const users = await this.#getUsers();
        users.push(user.toJSON());

        await writeFile(this.#filePath, JSON.stringify(users, null, 2), "utf8");

        // console.log(`[${CURRENT_FILE}] User created successfully ${user}`);

        logger.info(`[${CURRENT_FILE}] User created successfully ${user}`);

        return user;
    }

    async findById(id) {
        // console.log(`[${CURRENT_FILE}] Fetching user with Id: ${id}`);
        logger.info(`[${CURRENT_FILE}] Fetching user with Id: ${id}`);
        const users = await this.#getUsers();
        return users.find(u => u.id === id);
    }

    async findByEmail(email) {
        // console.log(`[${CURRENT_FILE}] Fetching user with Email: ${email}`);
        logger.info(`[${CURRENT_FILE}] Fetching user with Email: ${email}`);
        const users = await this.#getUsers();
        return users.find(u => u.email === email);
    }

    async findAll() {
        // console.log(`[${CURRENT_FILE}] Fetching all users`);
        logger.info(`[${CURRENT_FILE}] Fetching all users`);
        const users = await this.#getUsers();
        return users;
    }

    async update(id, user) {

        if (!(user instanceof User)) {
            throw new Error("Invalid user object");
        }

        const users = await this.#getUsers();

        const index = users.findIndex(u => u.id === id);

        if (index === -1) throw new UserNotFoundError(`User with Id ${id} not found`);

        users[index].fullName = user.fullName;
        users[index].birthDate = user.birthDate;
        users[index].status = user.status;

        await writeFile(this.#filePath, JSON.stringify(users, null, 2), "utf8");

        return users[index];
    }

    async delete(id) {
        let users = await this.#getUsers();

        const user = users.find(u => u.id === id);

        if (!user) throw new UserNotFoundError(`User with Id ${id} not found`);

        users = users.filter(u => u.id !== id);

        await writeFile(this.#filePath, JSON.stringify(users, null, 2), "utf8");

        return user;
    }

    async approve(id) {
        const users = await this.#getUsers();

        const index = users.findIndex(u => u.id === id);

        if (index === -1) throw new UserNotFoundError(`User with Id ${id} not found`);

        users[index].status = UserStatus.APPROVED;

        await writeFile(this.#filePath, JSON.stringify(users, null, 2), "utf8");

        return users[index];
    }

    async borrowBook(id, book) {
        
    }
    async returnBook(id, book) {
        
    }
}
