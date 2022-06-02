const { Router } = require("express");
const { getUserById, registerUser, login, updateUser, deleteUser, renewToken } = require("../controllers/user");
const { validateJWT } = require("../middlewares/validate-jwt");


const router = Router();

router.post("/register", [], registerUser);
router.post("/login", [], login);
router.get("/check", validateJWT, renewToken);
router.put("/save/:id", [], updateUser);
router.delete("/delete/:id", deleteUser);
module.exports = router;