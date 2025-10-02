import BookService from "../service/BookService.js";
import BookRequest from "../dto/BookRequest.js"
import path from "path";
import i18n from "../lang/i18nConfig.js";
import logger from "../log/logger.js";
import { log } from "console";


const CURRENT_FILE = path.basename(import.meta.url);

export default class BookController {

    #bookService;

    constructor(bookService) {

        if (!(bookService instanceof BookService)) {

            // console.error(`[${CURRENT_FILE}] Book Service must be provided`);
            logger.error('Book Service must be provided', { file: CURRENT_FILE });

            throw new Error('Book Service must be provided');
        }

        this.#bookService = bookService;
    }

    /**
       * Create a new book
       */
    createBook = async (req, res, next) => {

        // console.log(`[${CURRENT_FILE}] Creating new book`);

        logger.info(`Creating new book`, { file: CURRENT_FILE });

        const bookRequest = BookRequest.fromRequest(req);

        const book = await this.#bookService.save(bookRequest);

        // console.log(`[${CURRENT_FILE}] Book created successfully ${book}`);

        logger.info(`Book created successfully with ID: ${book.id}`, { file: CURRENT_FILE });

        res.status(201).json({
            success: true,
            data: book.toJSON(),
            message: i18n.__("BOOK.CREATED")
        });

    };

    /**
   * Get book by ID
   */
    getBookById = async (req, res, next) => {

        const { id } = req.params;

        // console.log(`[${CURRENT_FILE}] Fetching book with Id: ${id}`);

        logger.info(`Fetching book with Id: ${id}`, { file: CURRENT_FILE });

        const book = await this.#bookService.findById(id);

        // console.log(`[${CURRENT_FILE}] Book fetched successfully: ${book}`);

        logger.info(`Book fetched successfully with ID: ${id}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: book.toJSON(),
            message: i18n.__("BOOK.RETRIEVED_BY_ID", { id })
        });
    };

    /**
   * Get book by Isbn
   */
    getBookByIsbn = async (req, res) => {

        const { isbn } = req.params;

        // console.log(`[${CURRENT_FILE}] Fetching book with Isbn: ${isbn}`);

        logger.info(`Fetching book with Isbn: ${isbn}`, { file: CURRENT_FILE });

        const book = await this.#bookService.findByIsbn(isbn);

        // console.log(`[${CURRENT_FILE}] Book fetched successfully: ${book}`);

        logger.info(`Book fetched successfully with Isbn: ${isbn}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: book.toJSON(),
            message: i18n.__("BOOK.RETRIEVED_BY_ISBN", { isbn })
        });
    };

    /**
   * Get all books
   */
    getAllBooks = async (req, res) => {

        // console.log(`[${CURRENT_FILE}] Fetching all books`);

        logger.info(`Fetching all books`, { file: CURRENT_FILE });

        const books = await this.#bookService.findAll();

        // console.log(`[${CURRENT_FILE}] Fetched ${books.length} books successfully`);

        logger.info(`Fetched ${books.length} books successfully`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: books.map(book => book.toJSON()),
            message: i18n.__("BOOK.RETRIEVED_ALL"),
            count: books.length
        });
    };

    /**
   * Update book
   */
    updateBook = async (req, res) => {

        const { id } = req.params;

        const book = BookRequest.updateRequest(req);

        // console.log(`[${CURRENT_FILE}] Updating book : ${id}`);

        logger.info(`Updating book : ${id}`, { file: CURRENT_FILE });

        const updatedBook = await this.#bookService.update(id, book);

        // console.log(`[${CURRENT_FILE}] Book updated successfully: ${id}`);

        logger.info(`Book updated successfully: ${id}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: updatedBook.toJSON(),
            message: i18n.__("BOOK.UPDATED", { id }),
        });
    };

    /**
   * Delete book
   */
    deleteBook = async (req, res) => {

        const { id } = req.params;

        // console.log(`[${CURRENT_FILE}] Deleting book : ${id}`);

        logger.info(`Deleting book : ${id}`, { file: CURRENT_FILE });

        const deletedBook = await this.#bookService.delete(id);

        // console.log(`[${CURRENT_FILE}] Book deleted successfully: ${id}`);

        logger.info(`Book deleted successfully: ${id}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: deletedBook.toJSON(),
            message: i18n.__("BOOK.DELETED", { id }),
        });

    };
}