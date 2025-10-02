import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const { combine, timestamp, json, errors } = winston.format;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logger = winston.createLogger({
    level: 'info', // log level: error, warn, info, verbose, debug, silly
    format: combine(
        errors({ stack: true }), // capture stack traces
        timestamp(),             // add timestamp
        json()                   // format log as JSON
    ),
    transports: [
        new winston.transports.Console(), // log to console
        new winston.transports.File({ filename: path.join(__dirname, 'app.log') })

    ],
});

export default logger;
