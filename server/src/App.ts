import express, { Express } from "express";
import dotenv from "dotenv";

export default class App {
    public readonly http: Express;

    constructor() {
        this.http = express();

        dotenv.config({
            'path': '../.env'
        });

        this.http.use(express.urlencoded({ extended: true }));
    }
}