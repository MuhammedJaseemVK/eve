const express = require("express");
const router = express.Router();
const { loginController, registerController, getUserInfoController } = require("../controllers/userController")
const verifyUser = require("../middlewares/authMiddleware");

router.post('/register', registerController)
router.post('/login', loginController);
router.get('/get-user-info', verifyUser, getUserInfoController)


module.exports = router