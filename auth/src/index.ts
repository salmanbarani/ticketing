import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routs/current-user";
import { signinRouter } from "./routs/signin";
import { signoutRouter } from "./routs/signout";
import { signupRouter } from "./routs/signup";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => {
    console.log("Listing to 3000 !!!!!");
});