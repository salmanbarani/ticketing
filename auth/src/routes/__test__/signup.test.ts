import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 on invalid email and password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'tes.com',
        password: 'password'
      })
      .expect(400);

      await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'p'
      })
      .expect(400);
  });

  it('returns a 400 on missin email and password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({})
      .expect(400);
  });

  it('returns a 400 on duplicate signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);

    await request(app)
    .post('/api/users/signup')
    .send({
    email: 'test@test.com',
    password: 'password'
    })
    .expect(201);
  });

  it('after successful signup make sure that headers are defined', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
      expect(response.get("Set-Cookie")).toBeDefined();
      
    
  });