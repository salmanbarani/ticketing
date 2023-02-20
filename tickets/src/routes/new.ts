import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { currentUser, requireAuth, validationRequest } from '@salmantickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage("title is required"),
    body('price')
        .isFloat({gt: 0})
        .withMessage("price is required with positive values")
    

], validationRequest, async (req: Request, res: Response) => {
    const {title, price} = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    }); 
    await ticket.save();

    res.status(201).send(ticket);
});

export {router as createTicketRouter};