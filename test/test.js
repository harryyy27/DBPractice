const supertest = require('supertest');
const router = require('../src/router');
const test = require('tape');

test('cat equals cat'), (t) => {
  t.equals('cat', 'cat', 'cat equals cat');
  t.end();
}

test('testing home route', (t) => {
    supertest(router)
      .get('/')
      .expect(200)
      .expect("Content-Type", /html/)
      .end((err, res) => {
        t.error(err)
        t.equal(res.statusCode, 200, 'Should return status code of 200');
        t.end()
      })
});
