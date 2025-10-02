import AuthorizationError from "../error/AuthorizationError.js"
import i18n from "../lang/i18nConfig.js"


export default function roleMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (req.user.language == "ENGLISH") {
      i18n.setLocale("en");
    } else {
      i18n.setLocale("ar");
    }

    if (!allowedRoles.includes(userRole)) {
      throw new AuthorizationError("Forbidden: insufficient role");
    }
    next();
  };
}
