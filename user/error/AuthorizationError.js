// errors/AuthorizationError.js
export default class AuthorizationError extends Error {
  constructor(message = "Authorization failed") {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = 403; // HTTP 403 Forbidden
    this.timestamp = new Date().toISOString();

  }
}
