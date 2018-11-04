var express = require('express');
var router = express.Router();
var couponController = require("../controllers/couponController")

/* GET users listing. */
router.get('/', couponController.getCoupon);
router.get('/:category', couponController.getCoupons);

module.exports = router;
