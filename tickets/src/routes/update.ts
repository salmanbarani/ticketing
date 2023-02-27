import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { 
    NotFoundError,
    validationRequest,
    requireAuth,
    NotAuthorizedError

} from '@salmantickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put("/api/ticket/:id",async (req: Request, res: Response) => {
    
});

export {router as UpdateTicketRouter};