const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const { registerUser } = require('../controllers/authentication');

router.post('/register', upload.single("avatar"), registerUser);


module.exports  =  router;