import { Request, Response } from 'express';

export class CropsController {

    static async createCrop(req: Request, res: Response): Promise<void> {
        try {
            res.status(201).json({
                msg: 'Crop created successfully',
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ msg: 'Error creating crop', error: error.message });
            } else {
                res.status(500).json({ msg: 'Unknown error occurred' });
            }
        }
    }

    static async getCrop(req: Request, res: Response): Promise<any> {
        try {
            res.json({
                msg: 'Crop fetched successfully',
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ msg: 'Error fetching crops', error: error.message });
            } else {
                res.status(500).json({ msg: 'Unknown error occurred' });
            }
        }
    }
}
