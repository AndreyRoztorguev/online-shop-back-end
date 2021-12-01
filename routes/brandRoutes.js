const Router = require("express");
const brandController = require("../controllers/brandController");
const CheckRoleMiddleware = require("../middleware/CheckRoleMiddleware");

const router = new Router();

router.post("/", CheckRoleMiddleware("ADMIN"), brandController.create);
router.get("/", brandController.getAll);

module.exports = router;
