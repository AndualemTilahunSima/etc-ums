export const initalizeChatRoutes = (app) => {
    app.use('/api/chats', (req, resp) => {
        resp.end("Welcome to chating");
    });
}