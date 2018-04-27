'use strict';

const yup = require('yup');


module.exports = app => {

  app.beforeStart(() => {
    const { locale } = app.config.yup;

    if (locale !== null) {
      app.setYupLocale(locale);
    }

    app.yup = yup;
  });
};
