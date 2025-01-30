const { genOtp, verifyOtp, forgotOtp } = require('../controller/OtpController');
const express = require('express');
const router = express.Router();

router.post('/genotp', genOtp);
router.post('/verifyotp', verifyOtp);
router.post('/forgototp', forgotOtp);

module.exports = router;