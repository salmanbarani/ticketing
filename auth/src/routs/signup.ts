import express, {Request, Response}  from "express";
import { body, validationResult } from "express-validator";

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
        return res.status(400).send(error.array());
    };

    console.log("Everything seem to be alright !!!")

    res.send("Sign up was successful")
});


export {router as signupRouter};

