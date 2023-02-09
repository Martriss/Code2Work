const express = require('express');
const router = express.Router();
const mw = require('../middleware');
const controller = require('../controllers/userController');
const productController = require('../controllers/productController');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', mw.checkToken, controller.me);
router.get('/', controller.list);
router.get('/:userID', mw.checkToken, mw.getRole, controller.info);
router.put('/:userID', mw.checkToken, mw.getRole, controller.update);
router.delete('/:userID', mw.checkToken, mw.getRole, controller.delete);
router.get('/:userID/products', productController.list);

module.exports = router;