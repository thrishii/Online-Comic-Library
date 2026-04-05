const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

let token;

describe('Comic API Tests', function () {
  this.timeout(10000);

  before(async function () {
    const testEmail = process.env.TEST_ADMIN_EMAIL || 'admin@admin.com';
    const testPassword = process.env.TEST_ADMIN_PASSWORD || '123456';

    let loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: testPassword,
      });

    if (loginRes.status !== 200 || !loginRes.body.token) {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Admin',
          email: testEmail,
          password: testPassword,
        });

      loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: testPassword,
        });
    }

    if (loginRes.status !== 200 || !loginRes.body.token) {
      throw new Error('Admin login failed even after register');
    }

    token = loginRes.body.token;
  });

  it('should block access without token', async function () {
    const res = await request(app).get('/api/comics');
    if (res.status !== 401) {
      throw new Error(`Expected 401 without token, got ${res.status}`);
    }
  });

  it('should allow access with token', async function () {
    const res = await request(app)
      .get('/api/comics')
      .set('Authorization', `Bearer ${token}`);

    if (res.status !== 200) {
      throw new Error(`Expected 200 with token, got ${res.status}`);
    }
  });

  it('should create a comic', async function () {
    const res = await request(app)
      .post('/api/comics')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Comic',
        description: 'Test description',
      });

    if (res.status !== 201) {
      throw new Error(`Comic creation failed with status ${res.status}`);
    }
  });

  after(async function () {
    await mongoose.connection.close();
  });
});