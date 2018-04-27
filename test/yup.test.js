'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/yup.test.js', () => {
  let app;
  before(async () => {
    app = mock.app({
      baseDir: 'apps/yup-test',
    });

    await app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  describe('validate', () => {

    it('it works!', async () => {
      await app.httpRequest()
        .post('/user')
        .send({
          nickname: 'test',
          password: 'secret',
        })
        .expect('user created');
    });

    it('should throw error when miss nickname', async () => {
      const { body } = await app.httpRequest()
        .post('/user')
        .set('Accept', 'application/json')
        .send({
          password: 'secret',
        })
        .expect(422);

      assert(body.message === 'Validation Failed');
      assert.deepEqual(body.errors, [
        'nickname is required',
      ]);
    });

    it('should throw error when nickname not equal to`test`', async () => {
      const { body } = await app.httpRequest()
        .post('/user')
        .set('Accept', 'application/json')
        .send({
          nickname: 'abel',
          password: 'secret',
        })
        .expect(422);

      assert(body.message === 'Validation Failed');
      assert.deepEqual(body.errors, [
        'nickname already taken',
      ]);
    });
  });

  describe('validateSync', () => {

    it('it works!', async () => {
      await app.httpRequest()
        .post('/user/sync')
        .send({
          nickname: 'test',
          password: 'secret',
        })
        .expect('user created');
    });

    it('should throw error when miss nickname', async () => {
      const { body } = await app.httpRequest()
        .post('/user')
        .set('Accept', 'application/json')
        .send({
          password: 'secret',
        })
        .expect(422);

      assert(body.message === 'Validation Failed');
      assert.deepEqual(body.errors, [
        'nickname is required',
      ]);
    });
  });

  describe('config', () => {
    it('should all pass when use the default config', async () => {
      await app.httpRequest()
        .post('/user')
        .send({
          nickname: 'test',
          password: 'secret',
        })
        .expect('user created');
    });
  });

  describe('locale', () => {

    it('should set successfully', async () => {
      let hasError = false;
      try {
        app.setYupLocale('mars');

        let pass = false;

        try {
          await app.yup.number().min(20).validate(10);
        } catch (error) {
          pass = true;
          assert(error.message === '不能小于 20');
        }

        assert(pass === true);
      } catch (error) {
        hasError = true;
      }

      assert(hasError === false);
    });

    it('should set successfully when custom', async () => {
      let hasError = false;
      try {
        app.setYupLocale({
          number: {
            min: 'too min',
          },
        });

        let pass = false;

        try {
          await app.yup.number().min(20).validate(10);
        } catch (error) {
          pass = true;
          assert(error.message === 'too min');
        }

        assert(pass === true);
      } catch (error) {
        hasError = true;
      }

      assert(hasError === false);
    });

    it('should not succeed when locale not supprot', () => {
      let hasError = false;
      try {
        app.setYupLocale('venus');
      } catch (error) {
        hasError = true;
        assert(error.message === 'locale \'venus\' is not support.');
      }

      assert(hasError === true);
    });

    it('config has taken effect', async () => {
      app.setYupLocale('mars');

      const { body } = await app.httpRequest()
        .post('/user')
        .set('Accept', 'application/json')
        .send({
          nickname: 'test',
          password: 'secret',
          age: 12,
        })
        .expect(422);

      assert(body.message === 'Validation Failed');
      assert.deepEqual(body.errors, [
        '不能小于 18',
      ]);
    });
  });
});
