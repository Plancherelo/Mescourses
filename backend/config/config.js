"use strict";
/** Fichier configuration pour MongoDB et le port du serveur */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const MONGODB_USERNAME = "dbadmin";
const MONGODB_PASSWORD = "xb2fQ7tF2h1dR2V1";
const SERVER_PORT = 1992;
const MONGODB_LOGIN_URL = 'mongodb+srv://' + MONGODB_USERNAME + ':' + MONGODB_PASSWORD + '@cluster0.xezb1sw.mongodb.net/?retryWrites=true&w=majority';
class Config {
    constructor() {
        this.username = MONGODB_USERNAME;
        this.password = MONGODB_PASSWORD;
        this.port = SERVER_PORT;
        this.url = MONGODB_LOGIN_URL;
    }
}
exports.configuration = new Config();
