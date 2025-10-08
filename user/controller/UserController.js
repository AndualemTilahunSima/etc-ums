import UserService from "../service/UserService.js";
import UserRequest from "../dto/UserRequest.js"
import path from "path";
import i18n from "../lang/i18nConfig.js";
import logger from "../log/logger.js";
import { log } from "console";


const CURRENT_FILE = path.basename(import.meta.url);

export default class UserController {

    #userService;

    constructor(userService) {

        if (!(userService instanceof UserService)) {

            // console.error(`[${CURRENT_FILE}] User Service must be provided`);

            logger.error('User Service must be provided', { file: CURRENT_FILE });

            throw new Error('User Service must be provided');
        }

        this.#userService = userService;
    }

    /**
       * Create a new user
       */
    createUser = async (req, res, next) => {

        // console.log(`[${CURRENT_FILE}] Creating new user`);

        logger.info(`Creating new user`, { file: CURRENT_FILE });

        debugger;

        const userRequest = UserRequest.fromRequest(req);

        const user = await this.#userService.save(userRequest);

        // console.log(`[${CURRENT_FILE}] User created successfully ${user}`);

        logger.info(`User created successfully with ID: ${user.id}`, { file: CURRENT_FILE });


        res.status(201).json({
            success: true,
            data: user.toJSON(),
            message: i18n.__("USER.CREATED")
        });

    };

    /**
   * Get user by ID
   */
    getUserById = async (req, res, next) => {

        const { id } = req.params;

        // console.log(`[${CURRENT_FILE}] Fetching user with Id: ${id}`);

        logger.info(`Fetching user with Id: ${id}`, { file: CURRENT_FILE });

        const user = await this.#userService.findById(id);

        // console.log(`[${CURRENT_FILE}] User fetched successfully: ${user}`);

        logger.info(`User fetched successfully with ID: ${id}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: user.toJSON(),
            message: i18n.__("USER.RETRIEVED_BY_ID", { id })
        });

        
    };

    /**
   * Get user by Email
   */
    getUserByEmail = async (req, res) => {

        const { email } = req.params;

        // console.log(`[${CURRENT_FILE}] Fetching user with Email: ${email}`);

        logger.info(`Fetching user with Email: ${email}`, { file: CURRENT_FILE });

        const user = await this.#userService.findByEmail(email);

        // console.log(`[${CURRENT_FILE}] User fetched successfully: ${user}`);

        logger.info(`User fetched successfully with Email: ${email}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: user.toJSON(),
            message: i18n.__("USER.RETRIEVED_BY_EMAIL", { email })
        });
    };

    /**
   * Get all users
   */
    getAllUsers = async (req, res) => {

        // console.log(`[${CURRENT_FILE}] Fetching all users`);

        logger.info(`Fetching all users`, { file: CURRENT_FILE });

        const users = await this.#userService.findAll();

        // console.log(`[${CURRENT_FILE}] Fetched ${users.length} users successfully`);

        logger.info(`Fetched ${users.length} users successfully`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: users.map(user => user.toJSON()),
            message: i18n.__("USER.RETRIEVED_ALL"),
            count: users.length
        });
    };

    /**
   * Update user
   */
    updateUser = async (req, res) => {

        const { id } = req.params;

        const user = UserRequest.updateRequest(req);

        // console.log(`[${CURRENT_FILE}] Updating user : ${id}`);

        logger.info(`Updating user : ${id}`, { file: CURRENT_FILE });

        const updatedUser = await this.#userService.update(id, user);

        // console.log(`[${CURRENT_FILE}] User updated successfully: ${id}`);

        logger.info(`User updated successfully: ${id}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: updatedUser.toJSON(),
            message: i18n.__("USER.UPDATED", { id }),
        });
    };

    /**
   * Delete user
   */
    deleteUser = async (req, res) => {

        const { id } = req.params;

        // console.log(`[${CURRENT_FILE}] Deleting user : ${id}`);

        logger.info(`Deleting user : ${id}`, { file: CURRENT_FILE });

        const deletedUser = await this.#userService.delete(id);

        // console.log(`[${CURRENT_FILE}] User deleted successfully: ${id}`);

        logger.info(`User deleted successfully: ${id}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: deletedUser.toJSON(),
            message: i18n.__("USER.DELETED", { id }),
        });

    };

    /**
  * Approve user
  */
    approveUser = async (req, res) => {

        const { id } = req.params;

        // console.log(`[${CURRENT_FILE}] Approving user : ${id}`);

        logger.info(`Approving user : ${id}`, { file: CURRENT_FILE });

        const approvedUser = await this.#userService.approve(id);

        // console.log(`[${CURRENT_FILE}] User approved successfully: ${id}`);

        logger.info(`User approved successfully: ${id}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: approvedUser.toJSON(),
            message: i18n.__("USER.APPROVED", { id }),
        });

    };

    /**
   * Borrow book
   */
    borrowBook = async (req, res) => {

        const { userId } = req.params;

        const { bookId } = req.params;

        // console.log(`[${CURRENT_FILE}] Borrowing book : ${bookId}`);

        logger.info(`User ${userId} borrowing book : ${bookId}`, { file: CURRENT_FILE });

        const borrowRecord = await this.#userService.borrowBook(userId, bookId);

        // console.log(`[${CURRENT_FILE}] Book borrow successfully: ${userId} ${bookId}`);

        logger.info(`Book borrowed successfully: ${userId} ${bookId}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: borrowRecord,
            message: i18n.__("USER.BORROWED", { bookId, userId }),
        });

    };

    /**
   * Return book
   */
    returnBook = async (req, res) => {

        const { userId } = req.params;

        const { bookId } = req.params;

        // console.log(`[${CURRENT_FILE}] Returning book : ${bookId}`);

        logger.info(`User ${userId} returning book : ${bookId}`, { file: CURRENT_FILE });

        const borrowRecord = await this.#userService.returnBook(userId, bookId);

        // console.log(`[${CURRENT_FILE}] Book returned successfully: ${userId} ${bookId}`);

        logger.info(`Book returned successfully: ${userId} ${bookId}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: borrowRecord,
            message: i18n.__("USER.RETURNED", { bookId, userId }),
        });

    };

    /**
   * Get Users With Min Borrow Count
   */
    getUsersWithMinBorrowCount = async (req, res) => {
        
        // console.log(`[${CURRENT_FILE}] Fetching users with min borrow count`);

        logger.info(`Fetching users with min borrow count`, { file: CURRENT_FILE });

        const borrowCounts = await this.#userService.getUsersWithMinBorrowCount();

        console.log(`[${CURRENT_FILE}] Fetched users with min borrow count successfully`);

        logger.info(`Fetched users with min borrow count successfully`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: borrowCounts,
            message: i18n.__("USER.MIN_BORROW_COUNT"),
        });
    };

     /**
   * Get Users With Max Borrow Count
   */
    getUsersWithMaxBorrowCount = async (req, res) => {
        
        // console.log(`[${CURRENT_FILE}] Fetching users with max borrow count`);

        logger.info(`Fetching users with max borrow count`, { file: CURRENT_FILE });

        const borrowCounts = await this.#userService.getUsersWithMaxBorrowCount();

        // console.log(`[${CURRENT_FILE}] Fetched users with max borrow count successfully`);

        logger.info(`Fetched users with max borrow count successfully`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: borrowCounts,
            message: i18n.__("USER.MAX_BORROW_COUNT"),
        });
    };
}