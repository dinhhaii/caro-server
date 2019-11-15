module.exports = {
    CONNECTION_STRING: "mongodb+srv://dinhhai:uyH9XSU8uwxD4CbA@dhcluster-imuro.mongodb.net/Caro?retryWrites=true&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || "jwt_secret",
    GOOGLE_CLIENT_ID: "1096476817213-d3t26721uvahbs609g3kuov0kt0fodai.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "kCRjmAZBTi5lpuvatPgzlux0",
    FACEBOOK_APP_ID: "546945696118747",
    FACEBOOK_APP_SECRET: "7b3c2fe57386fcbcf3b021a65176695b",
    // URL_CLIENT: "http://localhost:3001",
    URL_CLIENT: "https://dinhhai-caro.herokuapp.com",
    SOCKET_FIND_PARTNER: "SOCKET_FIND_PARTNER",
    SOCKET_RESPONSE_PARTNER: "SOCKET_RESPONSE_PARTNER",
    SOCKET_CHAT: "SOCKET_CHAT",
    SOCKET_CARO_ONLINE: "SOCKET_CARO_ONLINE"
}