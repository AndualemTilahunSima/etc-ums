import { Router } from 'express';
import { FileStorageBookRepository } from '../repository/file-storage/FileStorgeBookRepository.js';
import { SequelizeBookRepository } from '../repository/sequelize/SequelizeBookRepository.js';
import BookController from '../controller/BookController.js';
import BookServiceImpl from '../service/BookServiceImpl.js';
import authMiddleware from '../middleware/AuthMiddleware.js';
import roleMiddleware from '../middleware/RoleMiddleware.js';

import { Role } from "../entity/Role.js";

/**
 * Book Routes - RESTful API endpoints
 */
export default class BookRoute {
    #router;
    #bookController;

    constructor() {
        this.#router = Router();
        this.#initializeDependencies();
        this.#setupRoutes();
    }

    #initializeDependencies() {
        const bookRepository = new SequelizeBookRepository();
        const bookService = new BookServiceImpl(bookRepository);
        this.#bookController = new BookController(bookService);
    }

    #setupRoutes() {
        // POST /api/book - Create new book 
        this.#router.post('/', authMiddleware, roleMiddleware([Role.LIBRARIAN]), this.#bookController.createBook);

        // GET /api/book - Get all books
        this.#router.get('/', authMiddleware, roleMiddleware([Role.LIBRARIAN]), this.#bookController.getAllBooks);

        // GET /api/book/:id - Get book by ID
        this.#router.get('/:id', authMiddleware, roleMiddleware([Role.LIBRARIAN]), this.#bookController.getBookById);

        // GET /api/book/:id/isbn - Get book by isbn
        this.#router.get('/isbn/:isbn', authMiddleware, roleMiddleware([Role.LIBRARIAN]), this.#bookController.getBookByIsbn);

        // PUT /api/book/:id - Update book
        this.#router.put('/:id', authMiddleware, roleMiddleware([Role.LIBRARIAN]), this.#bookController.updateBook);

        // DELETE /api/book/:id - Delete book
        this.#router.delete('/:id', authMiddleware, roleMiddleware([Role.LIBRARIAN]), this.#bookController.deleteBook);
    }

    getRouter() {
        return this.#router;
    }
}
