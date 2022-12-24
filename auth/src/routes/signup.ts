import express, {Request, Response}  from "express";
import { body,  } from "express-validator";
import  Jwt  from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import { validationRequest } from "../middlewares/validate-request";
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
],
validationRequest
, async  (req: Request, res: Response) => {
    const {email, password} = req.body;
    const emailExists = await User.findOne({email});
    if (emailExists) {
        throw new BadRequestError("Email in use");
    }

    const user = User.build({email, password});
    await user.save();

    // Generate JWT
    const userJwt = Jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    // Store it on session
    req.session = {
        jwt: userJwt
    };


    res.status(201).send(user);

});


export {router as signupRouter};

