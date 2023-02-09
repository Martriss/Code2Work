const express = require('express');
const router = express.Router();
const mw = require('../middleware');
const controller = require('../controllers/productController');

router.get('/', controller.list);
router.get('/:productID', controller.info);
router.post('/', mw.checkToken, controller.create);
router.put('/:productID', mw.checkToken, mw.getRole, mw.getOwner, controller.update);
router.delete('/:productID', mw.checkToken, mw.getRole, mw.getOwner, controller.delete);

module.exports = router;