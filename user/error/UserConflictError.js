// Specific custom error classes 
export default class UserConflictError extends Error {
  constructor(message = "User Conflict") {
    super(message);
    this.name = "UserConflictError";
    this.statusCode = 409;
    this.timestamp = new Date().toISOString();
  }
}