import express, { Router } from 'express';
import { CropsController } from '../controllers/crops.controllers';


const cropRouter: Router = express.Router();

cropRouter.post('/crop', CropsController.createCrop);
cropRouter.get('/crops', CropsController.getCrop);

export default cropRouter;
