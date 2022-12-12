import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from 'cookie-session'
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,  /* not encrepted*/
        secure: true, /* only used when protocol is HTTPS */
        
    })
);


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("/*", () => {
    throw new NotFoundError();
});

app.use(errorHandler); 


const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mong-srv:27017/auth");
    } catch (err) {
        console.error(err);
    }

    console.log("DB connected !!!");

    app.listen(3000, () => {
        console.log("Listing to 3000 !!!!!");
    });
}


start();