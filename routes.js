import { initalizeUserRoutes } from "./user/routes/routes.js";
import { initalizeChatRoutes } from "./chat/routes/routes.js";

export const registerRoutes = (app) => {
    initalizeUserRoutes(app);
    initalizeChatRoutes(app);
}
