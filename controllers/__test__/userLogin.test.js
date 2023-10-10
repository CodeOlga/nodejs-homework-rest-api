const request = require('supertest');
const server = require('../../server');

describe('POST /users/login', () => {
  it('should return user object and token', async () => {
    const testData = {
      email: "example@example.com",
      password: "examplepassword"
    }

    const response = await request(server).post('/users/login').send(testData);

     const {
      statusCode,
      body: { token },
    } = response;
    

     expect(statusCode).toBe(200);
    expect(token).toBeTruthy();
    expect(response.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });

  });
});