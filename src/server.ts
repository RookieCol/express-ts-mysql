import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import  {logger}  from './config/logger'; // Assuming you have a logger configuration

export default class Server {
    private app: Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.initializeMiddlewares();
    }
    private initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    listen() {
        this.app.listen(this.port, () => {
            logger.info(`Server running on port ${this.port}`);
        });
    }
}
