import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nets-wrapper";


const start = async () => {

    if (!process.env.JWT_KEY){
        throw new Error("JWT_KEY must be defined.");
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined.");
    }


    try {
        await natsWrapper.connect('ticketing', 'asdfsd','http://nats-srv:4222');

        natsWrapper.client.on("close", () => {
            console.log("NATS connection is closed!");
            process.exit();
        })
    
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());


        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }

    console.log("DB connected !!!");

    app.listen(3000, () => {
        console.log("Listing to 3000 !!!!!");
    });
}


start();