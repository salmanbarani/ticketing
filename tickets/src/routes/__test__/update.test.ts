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
    const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({title: "something", price:23})
            .expect(201);


    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({title:"update titel", price: 2300})
        .expect(401);


});

it("return 400 if the user provides an invalid title and price",async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({title: "something", price:23})
        .expect(201);

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({title: "", price:23})
    .expect(400);

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({title: "something", price:-22})
    .expect(400);


});

it("return 200 if update was successful",async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({title: "something", price:23})
        .expect(201);

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({title: "updated title", price:203})
    .expect(200);

    const updatedResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();
    
    expect(updatedResponse.body.title).toEqual("updated title");
    expect(updatedResponse.body.price).toEqual(203);
});
