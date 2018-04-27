'use strict';

exports.security = {
  ctoken: false,
  csrf: false,
};

exports.yup = {
  locale: 'mars',
  locales: {
    mars: {
      number: {
        min: '不能小于 ${min}',
      },
    },
  },
  onerror: (err, ctx) => {
    ctx.throw(422, 'Validation Failed', {
      errors: err.errors,
    });
  },
};
