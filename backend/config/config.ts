/** Fichier configuration pour MongoDB et le port du serveur */

const MONGODB_USERNAME : string = "dbadmin";
const MONGODB_PASSWORD : string = "xb2fQ7tF2h1dR2V1";
const SERVER_PORT : number = 1992;

const MONGODB_LOGIN_URL : string  = 'mongodb+srv://'+MONGODB_USERNAME+':'+MONGODB_PASSWORD+'@cluster0.xezb1sw.mongodb.net/?retryWrites=true&w=majority';

class Config {

    username : string;
    password : string;
    port : number;
    url : string;

    constructor(){
        this.username = MONGODB_USERNAME;
        this.password = MONGODB_PASSWORD;
        this.port = SERVER_PORT;
        this.url = MONGODB_LOGIN_URL;
    }
}

export let configuration = new Config()