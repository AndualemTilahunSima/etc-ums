// Specific custom error classes 
export default class BookBadRequestError extends Error {
  constructor(message = "Book Bad Request") {
    super(message);
    this.name = "BookBadRequestError";
    this.statusCode = 400;
    this.timestamp = new Date().toISOString();
  }
}