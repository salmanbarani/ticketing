import express, {Request, Response}  from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router()

router.post("/api/users/signup", 
[
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage("Password must be min 4 and max 20 characters")
]
,(req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()){
        throw new RequestValidationError(error.array());
    };

    throw new DatabaseConnectionError();
});


export {router as signupRouter};
