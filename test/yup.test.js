'use strict';

const mock = require('egg-mock');

describe('test/yup.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/yup-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, yup')
      .expect(200);
  });
});
