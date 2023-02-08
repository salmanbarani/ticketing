import request from 'supertest';
import {app} from '../../app';

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
    const response = await request(app).post('/api/tickets').send({})
    expect(response.status).not.toEqual(401)
});


it('Error if an invalid title is provided',async () => {
    
});


it('Error if an invalid price is provided',async () => {
    
});

it('create ticket with valid data',async () => {
    
});