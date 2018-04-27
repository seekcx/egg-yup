# egg-yup

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-yup.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-yup
[travis-image]: https://img.shields.io/travis/eggjs/egg-yup.svg?style=flat-square
[travis-url]: https://travis-ci.org/seekcx/egg-yup
[codecov-image]: https://img.shields.io/codecov/c/github/seekcx/egg-yup.svg?style=flat-square
[codecov-url]: https://codecov.io/github/seekcx/egg-yup?branch=master
[david-image]: https://img.shields.io/david/seekcx/egg-yup.svg?style=flat-square
[david-url]: https://david-dm.org/seekcx/egg-yup
[snyk-image]: https://snyk.io/test/npm/egg-yup/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-yup
[download-image]: https://img.shields.io/npm/dm/egg-yup.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-yup

Base on [yup](https://github.com/jquense/yup)

## Install

```bash
$ npm i egg-yup --save
```
or
```bash
$ yarn add egg-yup
```

## Usage

```js
// {app_root}/config/plugin.js
exports.yup = {
  enable: true,
  package: 'egg-yup',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.yup = {
  locale: 'zh-CN', // default null
  locales: { // default {}
    'zh-CN': {
      number: {
        min: '${path} 不能小于 {$min}'
      }
    }
  },
  options: { // ref: https://github.com/jquense/yup#mixedvalidatevalue-any-options-object-promiseany-validationerror
    strict: false;
    abortEarly: true;
    stripUnknown: false;
    recursive: true;
    context: null;
  },
  onerror: (err, ctx) => { // default null
    ctx.throw(422, 'Validation Failed', {
      errors: err.errors,
    });
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
// app/controller/user.js#register

const { ctx, app: { yup } } = this;

await ctx.validate({
  nickname: yup.string()
    .required('nickname is required')
    .matches(/^[a-z0-9]{4,12}$/, 'nickname invalid')
    .test('uniqueNickname', 'nickname already taken', value => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(value === 'test');
        }, 0);
      });
    }),
  password: yup.string()
    .required()
    .matches(/^[a-z]{6,16}$/, 'password invalid'),
  age: yup.number().min(18).max(80),
});
```

## Api reference

### app.yup -> yup
Original yup

### app.setYupLocale(locale: string | object)
Language setting

```js
// set by string
app.setYupLocale('mars');

// set by object
app.setYupLocale({
  number: {
    min: 'too min',
  },
});
```

### ctx.validate(rules: object[, values: object = null [, options: object = null]]) -> Promise
Async validate. **In order to allow asynchronous custom validations all (or no) tests are run asynchronously. A consequence of this is that test execution order cannot be guaranteed.** ref: [yup-doc](https://github.com/jquense/yup#mixedtestname-string-message-string-test-function-schema)

 - `rules`:  validate rules
 - `values`: validate data, default `ctx.request.body`
 - `options`: this will override the `options` in the config.

### ctx.validateSync(rules: object[, values: object = null [, options: object = null]]) -> Promise
Sync validate

 - `rules`:  validate rules
 - `values`: validate data, default `ctx.request.body`
 - `options`: this will override the `options` in the config.

## Questions & Suggestions

Please open an issue [here](https://github.com/seekcx/egg-yup/issues).

## License

[MIT](LICENSE)
