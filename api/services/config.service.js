export default class ConfigService {
    static NODE_ENV = process.env.NODE_ENV;
    static MONGO_USER = process.env.MONGO_USER || 'admin';
    static MONGO_PASS = process.env.MONGO_PASS || 'Note123';
    static MONGO_HOST = process.env.MONGO_HOST || `cluster0-1xgsh.mongodb.net`;
    static API_USER = process.env.MONGO_HOST || `admin`;
    static API_PASS = process.env.MONGO_HOST || `supersecret2`;

    static get(name) {
        return process.env[name];
    }
}