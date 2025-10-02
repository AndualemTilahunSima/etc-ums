import { Router } from 'express';
import { FileStorageUserRepository } from '../repository/file-storage/FileStorgeUserRepository.js';
import { SequelizeUserRepository } from '../repository/sequelize/SequelizeUserRepository.js';

import AuthController from '../controller/AuthController.js';
import AuthServiceImpl from '../service/AuthServiceImpl.js';
import authMiddleware from '../middleware/AuthMiddleware.js';


/**
 * User Routes - RESTful API endpoints
 */
export default class AuthRoute {
    #router;
    #authController;

    constructor() {
        this.#router = Router();
        this.#initializeDependencies();
        this.#setupRoutes();
    }

    #initializeDependencies() {
        const userRepository = new SequelizeUserRepository();
        const authService = new AuthServiceImpl(userRepository);
        this.#authController = new AuthController(authService);
    }

    #setupRoutes() {
        // POST /api/auth - Login
        this.#router.post('/login', this.#authController.login);
        this.#router.post('/refresh',this.#authController.refresh);


    }

    getRouter() {
        return this.#router;
    }
}