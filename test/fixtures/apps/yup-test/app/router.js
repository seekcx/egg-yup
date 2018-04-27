'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.post('/user', controller.user.register);
  router.post('/user/sync', controller.user.registerSync);
};
