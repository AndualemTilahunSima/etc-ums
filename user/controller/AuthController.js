import AuthService from "../service/AuthService.js";
import UserCredential from "../dto/UserCredential.js"
import path from "path";
import logger from "../log/logger.js";

const CURRENT_FILE = path.basename(import.meta.url);


export default class AuthController {
    #authService;

    constructor(authService) {

        if (!(authService instanceof AuthService)) {

            // console.error(`[${CURRENT_FILE}] Auth Service must be provided`);
            logger.error('Auth Service must be provided', { file: CURRENT_FILE });

            throw new Error('Auth Service must be provided');
        }

        this.#authService = authService;
    }


    login = async (req, res, next) => {


        logger.info(`Login attempt for user: ${req.body.email}`, { file: CURRENT_FILE });

        const userCredential = UserCredential.fromRequest(req);

        const token = await this.#authService.login(userCredential);

        console.log(`[${CURRENT_FILE}] Token created successfully ${token}`);
        
        logger.info(`Token created successfully for user: ${req.body.email}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: token,
            message: 'Token created successfully'
        });

        

    };

    refresh = async (req, res, next) => {

        // console.log(`[${CURRENT_FILE}] Referesh token for user: ${req.body.refreshToken}`);
        logger.er(`Referesh token for user: ${req.body.refreshToken}`, { file: CURRENT_FILE });

        const token = await this.#authService.refresh(req.body.refreshToken);

        // console.log(`[${CURRENT_FILE}] Token created successfully ${token}`);
        logger.info(`Token created successfully for user: ${req.body.refreshToken}`, { file: CURRENT_FILE });

        res.status(200).json({
            success: true,
            data: token,
            message: 'Token created successfully'
        });

    };
}