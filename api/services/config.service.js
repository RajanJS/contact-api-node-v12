export class ConfigService {
    static NODE_ENV = process.env.NODE_ENV;
    static MONGO_USER = 'admin';//process.env.MONGO_USER || 'admin';
    static MONGO_PASS = 'Note123';//process.env.MONGO_PASS || 'Note%40123';
    static MONGO_HOST = process.env.MONGO_HOST || `cluster0-1xgsh.mongodb.net`;

    static get(name) {
        return process.env[name];
    }
}