const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
require('dotenv').config();

const app = require('../server');

describe('Comic API Tests', () => {
  let adminToken = '';
  let createdComicId = '';

  it('should block access without token', async () => {
    const res = await request(app).get('/api/comics');
    expect(res.status).to.equal(401);
  });

  it('should fail with invalid token', async () => {
    const res = await request(app)
      .get('/api/comics')
      .set('Authorization', 'Bearer faketoken');

    expect(res.status).to.equal(401);
  });

  it('should login as admin and return token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: process.env.TEST_ADMIN_EMAIL,
        password: process.env.TEST_ADMIN_PASSWORD,
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('role');
    expect(res.body.role).to.equal('Admin');

    adminToken = res.body.token;
  });

  it('should fetch comics with valid admin token', async () => {
    const res = await request(app)
      .get('/api/comics')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should create a comic with valid admin token', async () => {
    const res = await request(app)
      .post('/api/comics')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Mocha Test Comic',
        author: 'Test Author',
        genre: 'Action',
        description: 'Created during automated testing',
        image: '',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.title).to.equal('Mocha Test Comic');

    createdComicId = res.body._id;
  });

  it('should fetch single comic details with valid token', async () => {
    const res = await request(app)
      .get(`/api/comics/${createdComicId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id');
    expect(res.body._id).to.equal(createdComicId);
  });

  it('should update a comic with valid admin token', async () => {
    const res = await request(app)
      .put(`/api/comics/${createdComicId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Updated Mocha Test Comic',
      });

    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Updated Mocha Test Comic');
  });

  it('should delete a comic with valid admin token', async () => {
    const res = await request(app)
      .delete(`/api/comics/${createdComicId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');
  });
});