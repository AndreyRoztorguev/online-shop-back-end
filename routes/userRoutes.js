const Router = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const userController = require("../controllers/userController");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
