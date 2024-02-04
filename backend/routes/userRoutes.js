const express = require("express");
const {
    users,
    createUser,
    authenticate,
    confirm,
    forgotPassword,
    validateToken,
    newPassword,
    profile,
    addFavorites,
    favorites,
    deleteFavorites
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
router.route("/:userId/favorites/:pokemonId").post(addFavorites).delete(deleteFavorites);
router.get("/:userId/favorites", favorites);

router.get("/profile", checkAuth, profile);

module.exports = router;