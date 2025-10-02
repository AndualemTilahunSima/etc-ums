// Specific custom error classes 
export default class BookConflictError extends Error {
  constructor(message = "Book Conflict") {
    super(message);
    this.name = "BookConflictError";
    this.statusCode = 409;
    this.timestamp = new Date().toISOString();
  }
}