import UserRoute from "./UserRoute.js";
import AuthRoute from "./AuthRoute.js";
import BookRoute from "./BookRoute.js";

export const initalizeUserRoutes = (app) => {
    const userRoute = new UserRoute();
    const authRoute = new AuthRoute();
    const bookRoute = new BookRoute();

    app.use('/api/users', userRoute.getRouter());
    app.use('/api/books', bookRoute.getRouter());
    app.use('/api/auth', authRoute.getRouter());
}