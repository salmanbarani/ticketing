import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { requireAuth, validationRequest } from '@salmantickets/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage("title is required"),
    body('price')
        .isFloat({gt: 0})
        .withMessage("price is required with positive values")
    

], validationRequest, (req: Request, res: Response) => {
    res.sendStatus(200);
});

export {router as createTicketRouter};