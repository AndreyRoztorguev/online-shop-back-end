const Router = require("express");
const deviceRouter = require("./deviceRoutes");
const userRouter = require("./userRoutes");
const brandRouter = require("./brandRoutes");
const typeRouter = require("./typeRoutes");

const router = new Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

module.exports = router;
