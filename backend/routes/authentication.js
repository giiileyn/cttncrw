const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const { registerUser, loginUser, forgotPass, resetPassword } = require('../controllers/authentication');

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login',loginUser);
router.post('/password/forgot',forgotPass);
router.put('/password/reset/:token',resetPassword)

module.exports  =  router;