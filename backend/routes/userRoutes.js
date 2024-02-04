const express = require("express");
const {
    users,
    createUser,
    authenticate,
    confirm,
    forgotPassword,
    validateToken,
    newPassword,
    profile
} = require("../controller/userController");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

// Auth, Register and Users Confirm
router.get("/", users);
router.post("/", createUser);
router.post("/login", authenticate);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(validateToken).post(newPassword);

router.get("/profile", checkAuth, profile);

module.exports = router;