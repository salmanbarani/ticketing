import {Request, Response, NextFunction} from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`err instanceof DatabaseConnectionError`);

    if (err instanceof RequestValidationError){
        console.log("Valiadtion error " );
    }

    if (err instanceof DatabaseConnectionError) {
        console.log("Database connection error");
    }

    res.status(400).send(err.message);
};