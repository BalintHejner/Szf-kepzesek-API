const express = require("express");
const { protect } = require("../middleware/auth");
const { register, getMe, login, forgotPassword } = require("../controllers/auth");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post('/forgotpassword', forgotPassword)
router.get('/me', protect, getMe)

module.exports = router;
