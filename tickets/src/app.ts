import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from 'cookie-session'
import { createTicketRouter } from "./routes/new";
import { errorHandler, NotFoundError, currentUser } from "@salmantickets/common";
import { showTicketHandler } from "./routes/show";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,  /* not encrepted*/
        secure: process.env.NODE_ENV !== 'test', /* only used when protocol is HTTPS */
        
    })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketHandler);

app.all("/*", () => {
    throw new NotFoundError();
});

app.use(errorHandler); 


export {app};