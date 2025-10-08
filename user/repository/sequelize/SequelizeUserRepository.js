import User from "../../entity/User.js";
import UserModel from "./db/models/User.js";
import BookModel from "./db/models/Book.js";
import { Borrow } from "./db/models/Borrow.js";
import UserRepository from "../UserRepository.js";
import UserNotFoundError from "../../error/UserNotFoundError.js";
import path from "path";
import sequelize from './config/db.js';
import logger from '../../log/logger.js';

const CURRENT_FILE = path.basename(import.meta.url);

export class SequelizeUserRepository extends UserRepository {

    async save(user) {
        if (!(user instanceof User)) {
            throw new Error("Invalid user object");
        }

        // console.log(`[${CURRENT_FILE}] Creating new user: ${user}`);

        logger.info(`[${CURRENT_FILE}] Creating new user: ${user}`);

        return await UserModel.create({
            fullName: user.fullName,
            email: user.email,
            birthDate: user.birthDate,
            password: user.passWord,
            role: user.role,
            language: user.language,
        });
    }

    async findById(id) {
        return await UserModel.findByPk(id);
    }

    async findByEmail(email) {
        return await UserModel.findOne({ where: { email } });
    }

    async findAll() {
        return await UserModel.findAll();
    }

    async update(id, user) {
        let userInstance = await UserModel.findByPk(id);

        if (!userInstance) {
            throw new UserNotFoundError(`User with Id ${id} not found`);
        }

        userInstance.fullName = user.fullName;
        userInstance.birthDate = user.birthDate;
        userInstance.status = user.status;

        await userInstance.save();
        return userInstance;
    }

    async delete(id) {
        return await UserModel.destroy({ where: { id } });
    }

    async approve(id) {
        return await UserModel.update(
            { status: "APPROVED" },
            { where: { id } }
        );
    }

    async borrowBook(userId, book) {
        let userInstance = await UserModel.findByPk(userId);

        if (!userInstance) {
            throw new Error(`User with Id ${userId} not found`);
        }

        let bookInstance = await BookModel.findByPk(book.id);

        if (!bookInstance) {
            throw new Error(`Book with Id ${book.id} not found`);
        }

        let borrowRecord = null;

        try {
            await sequelize.transaction(async t => {
                // Mark book as borrowed
                await bookInstance.update({ status: 'BORROWED' }, { transaction: t });

                // Create new Borrow entry (no composite restriction now!)
                borrowRecord = await Borrow.create({
                    user_id: userId,
                    book_id: book.id,
                    status: 'BORROWED',
                    borrowDate: new Date(),
                }, { transaction: t });
            });

            return borrowRecord;
        } catch (error) {
            logger.error(`[${CURRENT_FILE}] Error occurred while borrowing book: ${error.message}`);
            // console.error(`[${CURRENT_FILE}] Error occurred while borrowing book: ${error.message}`);
            throw error;
        }
    }

    async returnBook(userId, book) {
        let userInstance = await UserModel.findByPk(userId);

        if (!userInstance) {
            throw new Error(`User with Id ${userId} not found`);
        }

        let bookInstance = await BookModel.findByPk(book.id);

        if (!bookInstance) {
            throw new Error(`Book with Id ${book.id} not found`);
        }

        try {
            await sequelize.transaction(async t => {
                // Mark book available again
                await bookInstance.update({ status: 'AVAILABLE' }, { transaction: t });

                // Update the active borrow record
                await Borrow.update(
                    {
                        status: 'RETURNED',
                        returnDate: new Date(),
                    },
                    {
                        where: {
                            user_id: userId,
                            book_id: book.id,
                            status: 'BORROWED'
                        },
                        transaction: t
                    }
                );
            });

            return { message: `Book with Id ${book.id} has been returned successfully.` };
        } catch (error) {
            logger.error(`[${CURRENT_FILE}] Error occurred while returning book: ${error.message}`);
            // console.error(`[${CURRENT_FILE}] Error occurred while returning book: ${error.message}`);
            throw error;
        }
    }

    async getUsersWithMinBorrowCount() {
        const query = `
    (
      SELECT user_id,full_name, borrow_count, 'MIN' AS CountType
      FROM (
          SELECT user_id,full_name, COUNT(*) AS borrow_count
          FROM borrows
          INNER JOIN users ON borrows.user_id = users.id
          GROUP BY user_id
          ORDER BY borrow_count ASC
          LIMIT 1
      ) AS min_result
    );
    `;

        const [results] = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        // console.log(`[${CURRENT_FILE}] Users with Min Borrow Counts:`, results);

        logger.info(`[${CURRENT_FILE}] Users with Min Borrow Counts: ${JSON.stringify(results)}`);

        return results;
    }

    async getUsersWithMaxBorrowCount() {
        const query = `
    (
      SELECT user_id,full_name, borrow_count, 'MAX' AS CountType
      FROM (
          SELECT user_id,full_name, COUNT(*) AS borrow_count
          FROM borrows
          INNER JOIN users ON borrows.user_id = users.id
          GROUP BY user_id
          ORDER BY borrow_count DESC
          LIMIT 1
      ) AS max_result
    );
    `;

        const [results] = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        // console.log(`[${CURRENT_FILE}] Users with Max Borrow Counts:`, results);

        logger.info(`[${CURRENT_FILE}] Users with Max Borrow Counts: ${JSON.stringify(results)}`);


        return results;
    }

}
