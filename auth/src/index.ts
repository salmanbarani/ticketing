import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {

    if (!process.env.JWT_KEY){
        throw new Error("JWT_KEY must be defined.");
    }


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