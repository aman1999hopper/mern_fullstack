const express = require('express');
const authcontroller = require("../controllers/auth-controller.js");


const app = express();

const router = express.Router();

router.route('/').get(authcontroller.home);

router.route('/register').post(authcontroller.register)

router.route('/login').post(authcontroller.login)

module.exports = router;