// коментарі потрібні!, щоб лінтер розпізнавав глобальні функції та методи
/* eslint-env jest */
/* eslint-disable no-undef */

const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');

const { DB_HOST, PORT = 3000 } = process.env;

// --------1 спосіб-------------------
describe('test user login controller', () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('should return user object and token', async () => {
    const loginData = {
      email: "example@example.com",
      password: "examplepassword"
    }
    const {statusCode, body} = await request(app).post('/users/login').send(loginData);

    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
    expect(body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});


// --------2 спосіб--------------------
// describe('test user login controller', () => {
//   let server;
//   beforeAll(async () => {
//     await mongoose.connect(DB_HOST).then(() => (server = app.listen(PORT)));
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//     await server.close();
//   });

//   it('should return user object and token', async () => {
//     const res = await request(app).post('/users/login').send({
//       email: "example@example.com",
//       password: "examplepassword"
//     });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.token).toBeTruthy();
//     expect(res.body).toMatchObject({
//       user: {
//         email: expect.any(String),
//         subscription: expect.any(String),
//       },
//     });
//   });
// });



