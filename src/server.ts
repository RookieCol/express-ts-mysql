import express, { Application, Response, Request, NextFunction } from 'express';
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
    this.initializeErrorHandling();
  }
  private initializeMiddlewares() {
    this.app.use(helmet());
    this.app.use(morgan('combined', {
      stream: { write: (message) => logger.info(message.trim()) },
      skip: function (req, res) { return res.statusCode === 404; }
    }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeControllers() {
    this.app.use('/api/v1', cropRouter);
  }
  private initializeErrorHandling() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const errorMessage = `404 Not Found: ${req.method} ${req.originalUrl}`;
      logger.error(errorMessage); // Log the 404 error as an error
      res.status(404).send({ message: 'Resource not found' });
    });
  }

  listen(port: string) {
    this.app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  }
}
