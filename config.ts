export const config = {
        DB_URL: process.env.DB_URL ? process.env.DB_URL : "",
        SESSION_SECRET: process.env.SESSION_SECRET
                ? process.env.SESSION_SECRET
                : "",
        CLIENT_URL: process.env.CLIENT_URL ? process.env.CLIENT_URL : "",
};
