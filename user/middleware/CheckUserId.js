import { Role } from "../entity/Role.js";
import AuthorizationError from "../error/AuthorizationError.js"

export function checkUserIdMatch(req, res, next) {
  const userIdFromToken = req.user.id;
  const userIdFromUrl = req.params.id;

  const userEmailFromToken = req.user.email;
  const userEmailFromUrl = req.params.email;

  if (userIdFromUrl && userIdFromToken !== userIdFromUrl && req.user.role == Role.USER) {
    throw new AuthorizationError("Forbidden: you cannot access this resource");
  }

  if (userEmailFromUrl && userEmailFromToken !== userEmailFromUrl && req.user.role == Role.USER) {
    throw new AuthorizationError("Forbidden: you cannot access this resource");
  }

  next();
}
