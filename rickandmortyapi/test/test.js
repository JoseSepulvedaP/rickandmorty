'use strict'
 var request = require('supertest');
 var app = require('../server/server');

 describe('register', () => {
     describe('POST', () => {
       before(() => {
        let data = {
          username: 'josesepulveda',
          password: 'josesepulveda'
        }
        return request(app)
          .post('/register')
          .send(data)
        });
        it('Should create user in redis and return json as the default data format', (done) => {
          let d = new Date();
          let data = {
            username: `josesepulveda${d.getMilliseconds()}`,
            password: `josesepulveda${d.getMilliseconds()}`
          }
          request(app)
            .post('/register')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
        it('Should validate that user already exists in redis returning status 400 and json as the default data format', (done) => {
        let data = {
          username: 'josesepulveda',
          password: 'josesepulveda'
        }
        request(app)
          .post('/register')
          .send(data)
          .expect('Content-Type', /json/)
          .expect(400, done);
       });
     });
 });

 describe('login', () => {
  describe('POST', () => {
    it('Should login correctly and json as the default data format', (done) => {
      let data = {
        username: 'josesepulveda',
        password: 'josesepulveda'
      }
      request(app)
        .post('/login')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('Should validate that user does not exist in redis returning status 400 and json as the default data format', (done) => {
      let data = {
        username: 'josesepulvedapena',
        password: 'josesepulvedapena'
      }
      request(app)
        .post('/login')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });
});

describe('character', () => {
  describe('GET', () => {
     it('Should login to get the token and then get the character data and return json as the default data format', (done) => {
        let data = {
          username: 'josesepulveda',
          password: 'josesepulveda'
        }
        request(app)
          .post('/login')
          .send(data)
          .end((err, res) => {
            const token = res.body.token;
            request(app)
              .get('/character')
              .set('token', token)
              .expect('Content-Type', /json/)
              .expect(200, done);
          })
     });
     it('Should validate that sent token is not valid and return statusCode 401', (done) => {
       let token = 'invalidToken'
        request(app)
          .get('/character')
          .set('token', token)
          .expect('Content-Type', /json/)
          .expect(401, done);
    });
  });
});