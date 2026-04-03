const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const Comic = require('../models/Comic');

require('dotenv').config();

const app = require('../server');
const expect = chai.expect;

describe('Comic API Tests', function () {
  this.timeout(30000);

  let adminToken = '';
  let createdComicId = '';

  before(async function () {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: process.env.TEST_ADMIN_EMAIL,
        password: process.env.TEST_ADMIN_PASSWORD,
      });

    if (loginRes.status !== 200 || !loginRes.body.token) {
      throw new Error('Admin login failed. Check TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD in GitHub secrets.');
    }

    adminToken = loginRes.body.token;
  });

  it('should block access without token', async function () {
    const res = await request(app).get('/api/comics');
    expect(res.status).to.equal(401);
  });

  it('should return a valid admin token', function () {
    expect(adminToken).to.be.a('string');
    expect(adminToken).to.not.equal('');
  });

  it('should fetch comics with valid token', async function () {
    const res = await request(app)
      .get('/api/comics')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should create a comic as admin', async function () {
    const res = await request(app)
      .post('/api/comics')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'CI Test Comic',
        author: 'Test Author',
        genre: 'Action',
        description: 'Comic created during CI test',
        image: 'https://example.com/test-comic.jpg',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');

    createdComicId = res.body._id;
  });

  it('should fetch a single comic by id', async function () {
    const res = await request(app)
      .get(`/api/comics/${createdComicId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id', createdComicId);
  });

  it('should update a comic as admin', async function () {
    const res = await request(app)
      .put(`/api/comics/${createdComicId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Updated CI Test Comic',
      });

    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Updated CI Test Comic');
  });

  it('should delete a comic as admin', async function () {
    const res = await request(app)
      .delete(`/api/comics/${createdComicId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Comic deleted successfully');

    createdComicId = '';
  });

  after(async function () {
    if (createdComicId) {
      await Comic.findByIdAndDelete(createdComicId);
    }

    await mongoose.connection.close();
  });
});