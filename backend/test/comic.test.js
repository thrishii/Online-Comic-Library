const request = require('supertest');
const app = require('../server'); // adjust if your path is different
const mongoose = require('mongoose');

let token;

describe('Comic API Tests', function () {

  // 🔥 BEFORE HOOK (FIXED)
  before(async function () {
    const testEmail = process.env.TEST_ADMIN_EMAIL || 'admin@admin.com';
    const testPassword = process.env.TEST_ADMIN_PASSWORD || '123456';

    // Try login first
    let loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: testEmail, password: testPassword });

    // If login fails → register → login again
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
        .send({ email: testEmail, password: testPassword });
    }

    if (loginRes.status !== 200 || !loginRes.body.token) {
      throw new Error('Admin login failed even after register');
    }

    token = loginRes.body.token;
  });

  // 🔹 TEST 1
  it('should block access without token', async function () {
    const res = await request(app).get('/api/comics');
    if (res.status !== 401) throw new Error('Expected 401 without token');
  });

  // 🔹 TEST 2
  it('should allow access with token', async function () {
    const res = await request(app)
      .get('/api/comics')
      .set('Authorization', `Bearer ${token}`);

    if (res.status !== 200) throw new Error('Expected 200 with token');
  });

  // 🔹 TEST 3 (Create comic)
  it('should create a comic', async function () {
    const res = await request(app)
      .post('/api/comics')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Comic',
        description: 'Test description',
      });

    if (res.status !== 201) throw new Error('Comic creation failed');
  });

  // 🔹 AFTER HOOK
  after(async function () {
    await mongoose.connection.close();
  });

});