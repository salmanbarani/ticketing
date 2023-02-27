import request from 'supertest';
import {app} from "../../app";
import mongoose from 'mongoose';

it("return 404 if id provided does not exist",async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.signin())
        .send({
            title: "Online Journey",
            price: 5
        })
        .expect(404);
});

it("return 401 if the user is not authenticated",async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "Online Journey",
            price: 5
        })
        .expect(401); 
});

it("return 401 if the user does not own the ticket",async () => {
    
});

it("return 400 if the user provides an invalid title and price",async () => {
    
});

it("return 200 if update was successful",async () => {
    
});
