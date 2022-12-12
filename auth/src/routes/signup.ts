import express, {Request, Response}  from "express";
import { body, validationResult } from "express-validator";
import  Jwt  from "jsonwebtoken";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";

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
, async  (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()){
        throw new RequestValidationError(error.array());
    };

    const {email, password} = req.body;
    const emailExists = await User.findOne({email});
    if (emailExists) {
        throw new BadRequestError("Email in use");
    }

    const user = User.build({email, password});
    user.save();

    // Generate JWT
    const userJwt = Jwt.sign({
        id: user.id,
        email: user.email
    }, 'temperary-asdf');

    // Store it on session
    req.session = {
        jwt: userJwt
    };


    res.status(201).send(user);

});


export {router as signupRouter};

