import logger from '../log/logger.js';

export const errorHandler = (err, req, res, next) => {

  logger.error(
    `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    { error: err }
  );

  return res.status(200).
    json({ statusCode: err.statusCode, name: err.name, message: err.message, timestamp: err.timestamp });

}
