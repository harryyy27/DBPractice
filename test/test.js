const supertest = require('supertest');
const router = require('../src/router');
const test = require('tape');
const handler = require('../src/handler');
const fs = require('fs');
const path = require('path');

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

test('testing css public route', (t)=> {
  supertest(router)
    .get('/public/style.css')
    .expect(200)
    .expect('Content-Type', /css/)
    .end((err,res)=> {
      t.error(err)
      t.equal(res.statusCode, 200, 'Should return status code of 200')
      t.end()
    })

});

test('testing javascript public route', (t) => {
  supertest(router)
    .get('/public/api.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end((err,res) => {
      t.error(err)
      t.equals(res.statusCode, 200, 'Should return a status code of 200')
      t.end()
    })
});

test('testing home 500 error route', (t) => {
  supertest(router)
    .get('/sf')
    .expect(500)
    .expect('Content-Type', /html/)
    .end((err,res) => {
      t.error(err)
      t.equals(res.statusCode, 500, 'Should return status code of 500')
      t.end()
    })
});

test('testing public 500 error route', (t) => {
  supertest(router)
    .get('/public/youdontexist.js')
    .expect(500)
    .expect('Content-Type', /html/)
    .end((err,res) => {
      t.error(err)
      t.equals(res.statusCode, 500, 'Should return 500 error')
      t.end()
    })
});

test('testing home root error', (t) => {
  (changeName = () => {
    fs.rename(`${path.join(__dirname, '..', 'public', 'index.html')}`, `${path.join(__dirname, '..', 'public', 'index.js')}`, function (err) {
      if (err) throw err;
      console.log('File Renamed!');
    });
  })();
  supertest(router)

    .get('/')
    .expect(500)
    .expect('Content-Type', /html/)
    .end((err,res) => {
      t.error(err)
      t.equals(res.statusCode, 500, 'Should return 500 error')
      t.end((changeNameBack = ()=> {
        fs.rename(`${path.join(__dirname, '..', 'public', 'index.js')}`,`${path.join(__dirname, '..', 'public', 'index.html')}`,  function (err) {
          if (err) throw err;
          console.log('File Renamed!');
        });
      })())
    })

});
