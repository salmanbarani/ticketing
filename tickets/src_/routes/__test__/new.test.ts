import request from 'supertest';
import {app} from '../../app';
import { Ticket } from '../../models/ticket';

it('route handler listening to /api/tickets for post request',async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

        expect(response.status).not.toEqual(404);
});

it('return 401 if user is not signed in',async () => {
    await request(app).post('/api/tickets').send({}).expect(401)
});


it('return other than 401 if user is signed in',async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set("Cookie", global.signin())
    .send({})
    console.log(response.status)
    expect(response.status).not.toEqual(401)
});


it('Error if an invalid title is provided',async () => {
    await request(app)
    .post('/api/tickets')
    .set("Cookie", global.signin())
    .send({
        title: '',
        price: 20
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set("Cookie", global.signin())
    .send({
        price: 20
    })
    .expect(400);
});


it('Error if an invalid price is provided',async () => {
    await request(app)
    .post('/api/tickets')
    .set("Cookie", global.signin())
    .send({
        title: 'adsfdsdf',
        price: -20
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set("Cookie", global.signin())
    .send({
        title: 'asdfasdf'
    })
    .expect(400); 
});

it('create ticket with valid data',async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    
    await request(app)
    .post('/api/tickets')
    .set("Cookie", global.signin())
    .send({
        title: 'adsfdsdf',
        price: 20
    })
    .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    
});