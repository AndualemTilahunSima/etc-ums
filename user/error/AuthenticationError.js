// errors/AuthenticationError.js
export default class AuthenticationError extends Error {
  constructor(message = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401; // HTTP 401 Unauthorized
    this.timestamp = new Date().toISOString(); 
  }
}
