import multer from "multer";
import mongoose from "mongoose";
import GridFsStorage from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import { ConfigService } from "../services";

export default class DbConfig {
    /** @type {mongoose.Connection} */
    static conn;
    /** @type {string} */
    static mongoURI;
    /** @type {multer.Instance} */
    static upload;
    /** @type {GridFSBucket} */
    static gfsBucket;

    constructor(dbName, bucketName) {
        this.dbName = dbName;
        this.bucketName = bucketName;
        this.mongoURI = `mongodb+srv://${ConfigService.MONGO_USER}:${ConfigService.MONGO_PASS}@${ConfigService.MONGO_HOST}/${dbName}?retryWrites=true&w=majority`;
    }


    async connectDb() {
        mongoose.connect(this.mongoURI, {
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        // retrieve mongoose default connection
        DbConfig.conn = mongoose.connection;
        DbConfig.conn.once("open", () => {
            console.log(`Connected to ${this.dbName} database`);

            // this.gfsBucket = this.createGridFsBucket("uploads");
            DbConfig.gfsBucket = new mongoose.mongo.GridFSBucket(DbConfig.conn.db, {
                bucketName: this.bucketName
            });

        });

        // createGridFsBucket(bucketName) {
        //     return new mongoose.mongo.GridFSBucket(DbConfig.conn.db, {
        //         bucketName
        //     });
        // }

        DbConfig.conn.on("error", err => console.error(err.message));

        const storage = new GridFsStorage({
            db: DbConfig.conn,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(16, (err, buf) => {
                        if (err) {
                            return reject(err);
                        }
                        const filename =
                            buf.toString("hex") + path.extname(file.originalname);
                        const fileInfo = {
                            metadata: {
                                originalName: file.originalname
                            },
                            filename: filename,
                            bucketName: this.bucketName
                        };
                        resolve(fileInfo);
                    });
                });
            }
        });

        DbConfig.upload = multer({
            storage,
            fileFilter: (req, file, cb) => {
                file.mimetype.includes("image")
                    ? cb(null, true)
                    : cb(new Error("Wrong file type - only accepts images"));
            }
        });

        return DbConfig.conn;
    }

    static getMulterUploadMiddleware() {
        return async (...args) => DbConfig.upload.single("file")(...args);
    }

    static get gfsBucket() {
        return this.gfsBucket;
    }
}