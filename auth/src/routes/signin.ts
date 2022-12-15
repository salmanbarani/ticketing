import express, {Request, Response}  from "express";
import { body} from "express-validator";
import { validationRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post("/api/users/signin", 
[
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage("Password must be min 4 and max 20 characters")
],
validationRequest
,(req: Request, res: Response) => {
    res.send("user signed in")
});


export {router as signinRouter};

