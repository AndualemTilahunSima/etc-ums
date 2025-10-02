// Specific custom error classes 
export default class UserNotFoundError extends Error {
  constructor(message = "User Not Found") {
    super(message);
    this.name = "UserNotFoundError";
    this.statusCode = 404;
    this.timestamp = new Date().toISOString();
  }
}