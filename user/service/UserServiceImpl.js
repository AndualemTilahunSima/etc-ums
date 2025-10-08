import path from 'path';
import bcrypt from "bcryptjs";
import { randomUUID } from 'crypto';
import UserNotFoundError from "../error/UserNotFoundError.js";
import UserConflictError from "../error/UserConflictError.js";
import UserRequest from "../dto/UserRequest.js";
import UserResponse from "../dto/UserResponse.js"
import UserRepository from "../repository/UserRepository.js";
import UserService from "./UserService.js";
import BookRepository from '../repository/BookRepository.js';
import User from '../entity/User.js';
import i18n from "../lang/i18nConfig.js";
import logger from '../log/logger.js';
import { log } from 'console';


const CURRENT_FILE = path.basename(import.meta.url);

export default class UserServiceImpl extends UserService {

    #userRepository;

    #bookRepository;

    constructor(userRepository, bookRepository) {
        super();

        if (!(userRepository instanceof UserRepository)) {

            // console.Error(`[${CURRENT_FILE}] Invalid user object`);

            logger.error('Invalid user object', { file: CURRENT_FILE });

            throw new Error('Invalid user object');
        }

        if (!(bookRepository instanceof BookRepository)) {

            // console.Error(`[${CURRENT_FILE}] Invalid book object`);

            logger.error('Invalid book object', { file: CURRENT_FILE });

            throw new Error('Invalid book object');
        }

        this.#userRepository = userRepository;

        this.#bookRepository = bookRepository;
    }

    async save(userRequest) {

        // console.log(`[${CURRENT_FILE}] Creating new user: ${userRequest}`);

        logger.info(`Creating new user`, { file: CURRENT_FILE });

        if (!(userRequest instanceof UserRequest)) {

            // console.Error(`[${CURRENT_FILE}] Invalid user object`);

            logger.error('Invalid user object', { file: CURRENT_FILE });

            throw new Error("Invalid user object");
        }

        let user = User.toUser(userRequest);

        user.id = randomUUID();

        const hashedPassword = await bcrypt.hash(user.passWord, 10);

        user.password = hashedPassword;

        const userByEmail = await this.#userRepository.findByEmail(user.email);

        if (userByEmail) {

            // console.error(`[${CURRENT_FILE}] User with email ${user.email} already exist`);

            logger.error(`User with email ${user.email} already exist`, { file: CURRENT_FILE });

            throw new UserConflictError(i18n.__("USER.CONFLICT_EMAIL", { email }));

        }

        let savedUser = await this.#userRepository.save(user);

        // console.log(`[${CURRENT_FILE}] User created successfully ${savedUser}`);

        logger.info(`User created successfully with ID: ${savedUser.id}`, { file: CURRENT_FILE });

        return UserResponse.toUserResponse(savedUser);
    }

    async findById(id) {

        // console.log(`[${CURRENT_FILE}] Fetching user with Id: ${id}`);

        logger.info(`Fetching user with Id: ${id}`, { file: CURRENT_FILE });

        const user = await this.#userRepository.findById(id);

        if (!user) {

            // console.error(`[${CURRENT_FILE}] User with Id ${id} not found`);

            logger.error(`User with Id ${id} not found`, { file: CURRENT_FILE });

            throw new UserNotFoundError(i18n.__("USER.NOT_FOUND_ID", { id }));

        }

        // console.log(`[${CURRENT_FILE}] User fetched successfully: ${user}`);

        logger.info(`User fetched successfully with ID: ${id}`, { file: CURRENT_FILE });

        return UserResponse.toUserResponse(user);
    }

    async findByEmail(email) {

        // console.log(`[${CURRENT_FILE}] Fetching user with email: ${email}`);

        logger.info(`Fetching user with Email: ${email}`, { file: CURRENT_FILE });

        const user = await this.#userRepository.findByEmail(email);

        if (!user) {

            // console.error(`[${CURRENT_FILE}] User with Id ${email} not found`);

            logger.error(`User with email ${email} not found`, { file: CURRENT_FILE });

            throw new UserNotFoundError(i18n.__("USER.NOT_FOUND_EMAIL", { email }));

        }

        // console.log(`[${CURRENT_FILE}] User fetched successfully: ${user}`);

        logger.info(`User fetched successfully with Email: ${email}`, { file: CURRENT_FILE });

        return UserResponse.toUserResponse(user);
    }

    async findAll() {

        // console.log(`[${CURRENT_FILE}] Fetching all users`);

        logger.info(`Fetching all users`, { file: CURRENT_FILE });

        const users = await this.#userRepository.findAll();

        // console.log(`[${CURRENT_FILE}] Fetched ${users.length} users successfully`);

        logger.info(`Fetched ${users.length} users successfully`, { file: CURRENT_FILE });

        return users.map(user => UserResponse.toUserResponse(user));

    }

    async update(id, userRequest) {

        // console.log(`[${CURRENT_FILE}] Updating user: ${userRequest} given id ${id}`);

        logger.info(`Updating user with ID: ${id}`, { file: CURRENT_FILE });

        let user = User.toUser(userRequest);

        let updatedUser = await this.#userRepository.update(id, user);

        // console.log(`[${CURRENT_FILE}] User updated successfully ${updatedUser}`);

        looger.info(`User updated successfully with ID: ${id}`, { file: CURRENT_FILE });

        return UserResponse.toUserResponse(updatedUser);
    }

    async delete(id) {

        // console.log(`[${CURRENT_FILE}] Deleting user : ${id}`);

        looger.info(`Deleting user with ID: ${id}`, { file: CURRENT_FILE });

        let user = await this.#userRepository.delete(id);

        // console.log(`[${CURRENT_FILE}] User deleted successfully ${user}`);

        looger.info(`User deleted successfully with ID: ${id}`, { file: CURRENT_FILE });

        return UserResponse.toUserResponse(user);
    }

    async approve(id) {

        // console.log(`[${CURRENT_FILE}] Approving user : ${id}`);

        looger.info(`Approving user with ID: ${id}`, { file: CURRENT_FILE });

        let approvedUser = await this.#userRepository.approve(id);

        return UserResponse.toUserResponse(approvedUser);
    }

    async borrowBook(userId, bookId) {

        // console.log(`[${CURRENT_FILE}] User borrowing book : ${bookId}`);

        looger.info(`User ${userId} borrowing book : ${bookId}`, { file: CURRENT_FILE });

        let book = await this.#bookRepository.findById(bookId);

        if (!book) {
            // console.error(`[${CURRENT_FILE}] Book with Id ${bookId} not found`);

            looger.error(`Book with Id ${bookId} not found`, { file: CURRENT_FILE });

            throw new Error('Book not found');
        }

        let user = await this.#userRepository.findById(userId);

        if (!user) {
            // console.error(`[${CURRENT_FILE}] User with Id ${userId} not found`);

            looger.error(`User with Id ${userId} not found`, { file: CURRENT_FILE });

            throw new Error('User not found');
        }

        return await this.#userRepository.borrowBook(userId, book);

    }

    async returnBook(userId, bookId) {

        // console.log(`[${CURRENT_FILE}] User returning book : ${bookId}`);

        looger.info(`User ${userId} returning book : ${bookId}`, { file: CURRENT_FILE });

        let book = await this.#bookRepository.findById(bookId);

        if (!book) {
            // console.error(`[${CURRENT_FILE}] Book with Id ${bookId} not found`);
            logger.error(`Book with Id ${bookId} not found`, { file: CURRENT_FILE });

            throw new Error('Book not found');
        }

        let user = await this.#userRepository.findById(userId);

        if (!user) {
            // console.error(`[${CURRENT_FILE}] User with Id ${userId} not found`);
            logger.error(`User with Id ${userId} not found`, { file: CURRENT_FILE });

            throw new Error('User not found');
        }

        await this.#userRepository.returnBook(userId, book);

    }

    async getUsersWithMinBorrowCount() {
        
        // console.log(`[${CURRENT_FILE}] Fetching users with min borrow count`);

        looger.info(`Fetching users with min borrow count`, { file: CURRENT_FILE });
       
        return await this.#userRepository.getUsersWithMinBorrowCount();
    }

    async getUsersWithMaxBorrowCount() {
        
        // console.log(`[${CURRENT_FILE}] Fetching users with max borrow count`);

        logger.info(`Fetching users with max borrow count`, { file: CURRENT_FILE });
       
        return await this.#userRepository.getUsersWithMaxBorrowCount();
    }

}