// Specific custom error classes 
export default class UserBadRequestError extends Error {
  constructor(message = "User Bad Request") {
    super(message);
    this.name = "UserBadRequestError";
    this.statusCode = 400;
    this.timestamp = new Date().toISOString();
  }
}