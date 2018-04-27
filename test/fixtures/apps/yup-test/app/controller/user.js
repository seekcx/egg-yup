'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
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
        .required('password is required')
        .matches(/^[a-z]{6,16}$/, 'password invalid'),
      age: yup.number().min(18).max(80),
    });

    ctx.body = 'user created';
  }

  async registerSync() {
    const { ctx, app: { yup } } = this;

    await ctx.validateSync({
      nickname: yup.string()
        .required('nickname is required')
        .matches(/^[a-z0-9]{4,12}$/, 'nickname invalid'),
      password: yup.string()
        .required('password is required')
        .matches(/^[a-z]{6,16}$/, 'password invalid'),
      age: yup.number().min(18).max(80),
    });

    ctx.body = 'user created';
  }
}

module.exports = UserController;
