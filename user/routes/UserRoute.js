import { Router } from 'express';
import { FileStorageUserRepository } from '../repository/file-storage/FileStorgeUserRepository.js';
import { SequelizeUserRepository } from '../repository/sequelize/SequelizeUserRepository.js';
import { SequelizeBookRepository } from '../repository/sequelize/SequelizeBookRepository.js';
import UserController from '../controller/UserController.js';
import UserServiceImpl from '../service/UserServiceImpl.js';
import authMiddleware from '../middleware/AuthMiddleware.js';
import roleMiddleware from '../middleware/RoleMiddleware.js';
import { checkUserIdMatch } from '../middleware/CheckUserId.js';

import { Role } from "../entity/Role.js";

/**
 * User Routes - RESTful API endpoints
 */
export default class UserRoute {
    #router;
    #userController;

    constructor() {
        this.#router = Router();
        this.#initializeDependencies();
        this.#setupRoutes();
    }

    #initializeDependencies() {
        const userRepository = new SequelizeUserRepository();
        const bookRepository = new SequelizeBookRepository();
        const userService = new UserServiceImpl(userRepository, bookRepository);
        this.#userController = new UserController(userService);
    }

    #setupRoutes() {
        // POST /api/user - Create new user 
        this.#router.post('/', this.#userController.createUser);

        // GET /api/user - Get all users
        this.#router.get('/', authMiddleware, roleMiddleware([Role.ADMIN]), this.#userController.getAllUsers);

        // GET /api/user/:id - Get user by ID
        this.#router.get('/:id', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.getUserById);

        // GET /api/user/:id/email - Update user email
        this.#router.get('/email/:email', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.getUserByEmail);

        // PUT /api/user/:id - Update user
        this.#router.put('/:id', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.updateUser);

        // DELETE /api/user/:id - Delete user
        this.#router.delete('/:id', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.deleteUser);

        this.#router.patch('/:id', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.approveUser);

        this.#router.post('/borrow-book/userId/:userId/bookId/:bookId', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.borrowBook);
        
        this.#router.post('/return-book/userId/:userId/bookId/:bookId', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.returnBook);

        this.#router.get('/users/min-borrowed-books', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.getUsersWithMinBorrowCount);
        
        this.#router.get('/users/max-borrowed-books', authMiddleware, roleMiddleware([Role.ADMIN, Role.USER]), checkUserIdMatch, this.#userController.getUsersWithMaxBorrowCount);

    }

    getRouter() {
        return this.#router;
    }
}
