const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .post((...args) => controller.search(...args));

router.route('/going/')
  .get((...args) => controller.find(...args));
router.route('/going/:id')
  .get((...args) => controller.going(...args));

module.exports = router;
