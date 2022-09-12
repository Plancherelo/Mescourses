import { configuration } from './config/config';
import express from 'express';
import http from 'http';
import mongoose from "mongoose";

import categoryRoutes from './routes/Category_routes';
import shopRoutes from './routes/Shop_routes';
import productRoutes from './routes/Product_routes';
import mainlistRoutes from './routes/Mainlist_routes';

class Server {
   
    constructor() {
        /** Se connecter à MongoDB */
        this.connecMongoDB();
    }
    
    private connecMongoDB(){
        /** Connection à MongoDB (Atlas). */
        mongoose.connect(configuration.url)
            .then(()=>{
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
    private startServer() {
        /** Démarrer le serveur web express */
        const webServer = express();
        /** Permet de poster des objets imbriqués (nested objects). */
        webServer.use(express.urlencoded({ extended : true}));
        /**  Json Parser */
        webServer.use(express.json());

        /** Règles de l'API tiré de la librairie cors. */
        webServer.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PATCH, PUT, POST, DELETE, GET, OPTIONS, HEAD');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });

        /** Routes */
        webServer.use('/', categoryRoutes);
        webServer.use('/', shopRoutes);
        webServer.use('/', productRoutes);
        webServer.use('/', mainlistRoutes);

        /** Créer le serveur http et imprimer sur la console le port sur lequelle il écoute. */
        http.createServer(webServer)
            .listen(configuration.port, () => {
                console.log('Server is listening on port '+ configuration.port)
        });
    }   
};

new Server();