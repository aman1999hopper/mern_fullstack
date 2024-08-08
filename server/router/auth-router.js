const express = require('express');
const authcontroller = require("../controllers/auth-controller.js");
const signupSchema = require("../validators/auth-validator.js");
const validate = require("../middleware/validate-middleware.js"); 


const app = express();

const router = express.Router();

router.route('/').get(authcontroller.home);

router.route('/register').post( validate(signupSchema),authcontroller.register)

router.route('/login').post(authcontroller.login)

module.exports = router;