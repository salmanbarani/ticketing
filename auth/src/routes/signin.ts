import express, {Request, Response}  from "express";
import { body} from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validationRequest } from "../middlewares/validate-request";
import Jwt from "jsonwebtoken";
import { User } from "../models/user";
import {Password} from "../services/password";

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
,async (req: Request, res: Response) => {
    
    const {email, password} = req.body;

    const existingUser = await User.findOne({email:email});
    
    if (!existingUser){
        throw new BadRequestError("Bad credentials!");
    }

    const passwordsMatched = await Password.compare(existingUser.password, password );

    if (!passwordsMatched){
        throw new BadRequestError("Bad credentials!");
    }


    // Generate JWT
    const userJwt = Jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    // Store it on session
    req.session = {
        jwt: userJwt
    };


    res.status(200).send(existingUser);

});


export {router as signinRouter};

