import request from 'supertest';
import { app } from '../../app';


it('current user has signed in', async () => {
    const cookie = await global.signin();

    const respond =  await request(app)
    .get('/api/users/currentuser')
    .set("Cookie", cookie)
    .send()
    .expect(200);
    
    expect(respond.body.currentUser.email).toEqual('test@test.com');
  });

  it('return null if user not signed in', async () => {
    const respond =  await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
    
    expect(respond.body.currentUser).toEqual(null);
  });  