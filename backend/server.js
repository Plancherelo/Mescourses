"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const Category_routes_1 = __importDefault(require("./routes/Category_routes"));
const Shop_routes_1 = __importDefault(require("./routes/Shop_routes"));
const Product_routes_1 = __importDefault(require("./routes/Product_routes"));
const Mainlist_routes_1 = __importDefault(require("./routes/Mainlist_routes"));
class Server {
    constructor() {
        /** Se connecter à MongoDB */
        this.connecMongoDB();
    }
    connecMongoDB() {
        /** Connection à MongoDB (Atlas). */
        mongoose_1.default.connect(config_1.configuration.url)
            .then(() => {
            console.log('Database connected');
            /** Si la connexion à la base de donnée est réussie, démarrer le serveur. */
            this.startServer();
        })
            /** Si la connexion à la base de donnée échoue, imprimer le message d'erreur. */
            .catch((error) => {
            console.log(error);
        });
    }
    /** Démarrer le serveur si MongoDB parvient à se connecter. */
    startServer() {
        /** Démarrer le serveur web express */
        const webServer = (0, express_1.default)();
        /** Permet de poster des objets imbriqués (nested objects). */
        webServer.use(express_1.default.urlencoded({ extended: true }));
        /**  Json Parser */
        webServer.use(express_1.default.json());
        /** Règles de l'API tiré de la librairie cors. */
        webServer.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PATCH, PUT, POST, DELETE, GET, OPTIONS, HEAD');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });
        /** Routes */
        webServer.use('/', Category_routes_1.default);
        webServer.use('/', Shop_routes_1.default);
        webServer.use('/', Product_routes_1.default);
        webServer.use('/', Mainlist_routes_1.default);
        /** Créer le serveur http et imprimer sur la console le port sur lequelle il écoute. */
        http_1.default.createServer(webServer)
            .listen(config_1.configuration.port, () => {
            console.log('Server is listening on port ' + config_1.configuration.port);
        });
    }
}
;
new Server();
