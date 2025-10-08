import path from 'path';
import bcrypt from "bcryptjs";
import { randomUUID } from 'crypto';
import BookNotFoundError from "../error/BookNotFoundError.js";
import BookConflictError from "../error/BookConflictError.js";
import BookRequest from "../dto/BookRequest.js";
import BookResponse from "../dto/BookResponse.js"
import BookRepository from "../repository/BookRepository.js";
import BookService from "./BookService.js";
import Book from '../entity/Book.js';
import i18n from "../lang/i18nConfig.js";
import logger from '../log/logger.js';
import { log } from 'console';

const CURRENT_FILE = path.basename(import.meta.url);

export default class BookServiceImpl extends BookService {

    #bookRepository;

    constructor(bookRepository) {
        super();

        if (!(bookRepository instanceof BookRepository)) {

            // console.Error(`[${CURRENT_FILE}] Invalid book object`);
            logger.error('Invalid book object', { file: CURRENT_FILE });

            throw new Error('Invalid book object');
        }

        this.#bookRepository = bookRepository;
    }

    async save(bookRequest) {

        // console.log(`[${CURRENT_FILE}] Creating new book: ${bookRequest}`);
        logger.info(`Creating new book`, { file: CURRENT_FILE });

        if (!(bookRequest instanceof BookRequest)) {

            // console.Error(`[${CURRENT_FILE}] Invalid book object`);

            logger.error('Invalid book object', { file: CURRENT_FILE });

            throw new Error("Invalid book object");
        }

        let book = Book.toBook(bookRequest);

        book.id = randomUUID();

        const bookByIsbn = await this.#bookRepository.findByIsbn(book.isbn);

        const isbn = book.isbn;

        if (bookByIsbn) {

            // console.error(`[${CURRENT_FILE}] Book with isbn ${book.isbn} already exist`);

            logger.error(`Book with isbn ${book.isbn} already exist`, { file: CURRENT_FILE });

            throw new BookConflictError(i18n.__("BOOK.CONFLICT_ISBN", { isbn }));

        }

        let savedBook = await this.#bookRepository.save(book);

        // console.log(`[${CURRENT_FILE}] Book created successfully ${savedBook}`);

        logger.info(`Book created successfully with ID: ${savedBook.id}`, { file: CURRENT_FILE });

        return BookResponse.toBookResponse(savedBook);
    }

    async findById(id) {

        // console.log(`[${CURRENT_FILE}] Fetching book with Id: ${id}`);

        logger.info(`Fetching book with Id: ${id}`, { file: CURRENT_FILE });

        const book = await this.#bookRepository.findById(id);

        if (!book) {

            // console.error(`[${CURRENT_FILE}] Book with Id ${id} not found`);

            logger.error(`Book with Id ${id} not found`, { file: CURRENT_FILE });

            throw new BookNotFoundError(i18n.__("BOOK.NOT_FOUND_ID", { id }));

        }

        // console.log(`[${CURRENT_FILE}] Book fetched successfully: ${book}`);

        logger.info(`Book fetched successfully with ID: ${id}`, { file: CURRENT_FILE });

        return BookResponse.toBookResponse(book);
    }

    async findByIsbn(isbn) {

        // console.log(`[${CURRENT_FILE}] Fetching book with isbn: ${isbn}`);

        logger.info(`Fetching book with isbn: ${isbn}`, { file: CURRENT_FILE });

        const book = await this.#bookRepository.findByIsbn(isbn);

        if (!book) {

            // console.error(`[${CURRENT_FILE}] Book with Id ${isbn} not found`);

            logger.error(`Book with isbn ${isbn} not found`, { file: CURRENT_FILE });

            throw new BookNotFoundError(i18n.__("BOOK.NOT_FOUND_ISBN", { isbn }));

        }

        // console.log(`[${CURRENT_FILE}] Book fetched successfully: ${book}`);

        logger.info(`Book fetched successfully with isbn: ${isbn}`, { file: CURRENT_FILE });

        return BookResponse.toBookResponse(book);
    }

    async findAll() {

        // console.log(`[${CURRENT_FILE}] Fetching all books`);

        logger.info(`Fetching all books`, { file: CURRENT_FILE });

        const books = await this.#bookRepository.findAll();

        // console.log(`[${CURRENT_FILE}] Fetched ${books.length} books successfully`);

        logger.info(`Fetched ${books.length} books successfully`, { file: CURRENT_FILE });

        return books.map(book => BookResponse.toBookResponse(book));

    }

    async update(id, bookRequest) {

        // console.log(`[${CURRENT_FILE}] Updating book: ${bookRequest} given id ${id}`);

        logger.info(`Updating book with ID: ${id}`, { file: CURRENT_FILE });

        let book = Book.toBook(bookRequest);

        let updatedBook = await this.#bookRepository.update(id, book);

        // console.log(`[${CURRENT_FILE}] Book updated successfully ${updatedBook}`);

        logger.info(`Book updated successfully with ID: ${updatedBook.id}`, { file: CURRENT_FILE });    

        return BookResponse.toBookResponse(updatedBook);
    }

    async delete(id) {

        // console.log(`[${CURRENT_FILE}] Deleting book : ${id}`);

        logger.info(`Deleting book : ${id}`, { file: CURRENT_FILE });

        let book = await this.#bookRepository.delete(id);

        // console.log(`[${CURRENT_FILE}] Book deleted successfully ${book}`);

        logger.info(`Book deleted successfully with ID: ${book.id}`, { file: CURRENT_FILE });

        return BookResponse.toBookResponse(book);
    }

}