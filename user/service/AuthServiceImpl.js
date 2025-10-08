import path from 'path';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserNotFoundError from "../error/UserNotFoundError.js";
import AuthenticationError from '../error/AuthenticationError.js';
import AuthorizationError from "../error/AuthorizationError.js"
import UserCredential from "../dto/UserCredential.js";
import UserRepository from "../repository/UserRepository.js";
import AuthService from "./AuthService.js";
import { UserStatus } from "../entity/UserStatus.js";
import i18n from "../lang/i18nConfig.js";


import { JWT_SECRET } from '../secret-key.js';
import logger from '../log/logger.js';

const CURRENT_FILE = path.basename(import.meta.url);

export default class AuthServiceImpl extends AuthService {

    #userRepository;

    constructor(userRepository) {
        super();

        if (!(userRepository instanceof UserRepository)) {

            // console.Error(`[${CURRENT_FILE}] Invalid user object`);

            logger.error('Invalid user object', { file: CURRENT_FILE });

            throw new Error('Invalid user object');
        }

        this.#userRepository = userRepository;
    }


    async login(userCredential) {

        if (!(userCredential instanceof UserCredential)) {

            // console.Error(`[${CURRENT_FILE}] Invalid user object`);

            logger.error('Invalid user object', { file: CURRENT_FILE });

            throw new Error("Invalid user object");
        }

        const email = userCredential.email;

        const password = userCredential.password;

        // console.log(`[${CURRENT_FILE}] Fetching user with email: ${email}`);

        logger.info(`Fetching user with email: ${email}`, { file: CURRENT_FILE });

        const user = await this.#userRepository.findByEmail(email);

        if (!user) {

            // console.error(`[${CURRENT_FILE}] User with Email ${email} not found`);

            logger.error(`User with Email ${email} not found`, { file: CURRENT_FILE });

            throw new UserNotFoundError(i18n.__("USER.NOT_FOUND_EMAIL", { email }));
        }

        if (user.status === UserStatus.PENDING) {

            // console.error(`[${CURRENT_FILE}] User with Email ${email} is pending approval by admin`);

            logger.error(`User with Email ${email} is pending approval by admin`, { file: CURRENT_FILE });

            throw new AuthenticationError(i18n.__("USER.PENDING_APPROVAL", { email }));

        }
 

        // console.log(`[${CURRENT_FILE}] User fetched successfully: ${user}`);

        logger.info(`User fetched successfully with Email: ${email}`, { file: CURRENT_FILE });

        const match = await bcrypt.compare(password, user.password);

        if (!match) throw new AuthenticationError("Invalid credentials");

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, language: user.language },
            JWT_SECRET,
            { expiresIn: "60m" }
        );
        const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.role, language: user.language }, JWT_SECRET, { expiresIn: "1h" });

        return { token, refreshToken };
    }

    refresh = async (refreshToken) => {

        // console.log(`[${CURRENT_FILE}] token for user: ${refreshToken}`);

        logger.info(`token for user: ${refreshToken}`, { file: CURRENT_FILE });

        const user = jwt.verify(refreshToken, JWT_SECRET);
        if(user){

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, language: user.language },
            JWT_SECRET,
            { expiresIn: "10s" }
        );
        return token;
    }
    };

}