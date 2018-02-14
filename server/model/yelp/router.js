const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .post((...args) => controller.search(...args));

module.exports = router;
