const Router = require("express");
const deviceController = require("../controllers/deviceController");
const CheckRoleMiddleware = require("../middleware/CheckRoleMiddleware");

const router = new Router();

router.post("/", CheckRoleMiddleware("ADMIN"), deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

module.exports = router;
