'use strict';

const { setLocale } = require('yup/lib/customLocale');

module.exports = {

  setYupLocale(locale) {
    let languagePackage;

    if (typeof locale === 'string') {
      const { locales } = this.config.yup;

      languagePackage = locales[locale];
      if (languagePackage === undefined) {
        throw new Error(`locale '${locale}' is not support.`);
      }
    } else {
      languagePackage = locale;
    }

    setLocale(languagePackage);
  },
};
