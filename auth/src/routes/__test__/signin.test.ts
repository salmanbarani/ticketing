import request from 'supertest';
import { app } from '../../app';

it('returns 400 when user not exist', async () => {
    await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('returns 400 when incorrect password is supplied', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
    
    await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'pass'
    })
    .expect(400);
});

it('returns a 200 on signin succcessful', async () => {
    
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(200);
      expect(response.get("Set-Cookie")).toBeDefined();
  });