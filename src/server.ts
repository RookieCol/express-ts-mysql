import express, { Application, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { logger } from './config/logger';
import cropRouter from './routes/crops.routes';
export default class Server {
  private app: Application;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers();
  }
  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeControllers() {
    this.app.use('/api/v1', cropRouter);
  }
  listen(port: string) {
    this.app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  }
}
