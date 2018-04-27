'use strict';

const make = (yup, rules) => {
  return yup.object().shape(rules);
};

const handle = (promise, errorHandle, ctx) => {
  return errorHandle === null ? promise : promise.catch(error => {
    return errorHandle(error, ctx);
  });
};

module.exports = {

  validate(rules, values = null, options = null) {
    options = Object.assign({}, this.app.config.yup.options, options);

    const promise = make(this.app.yup, rules)
      .validate(values || this.request.body, options);

    return handle(promise, this.app.config.yup.onerror, this);
  },

  validateSync(rules, values = null, options = null) {
    options = Object.assign({}, this.app.config.yup.options, options);

    return make(this.app.yup, rules)
      .validateSync(values || this.request.body, options);
  },
};
