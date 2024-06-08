const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth.js");
const { newOrder } = require("../controllers/orderController.js");



const router = express.Router();



// router.post("/order/new", isauthenticatedUser, newOrder);
router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id")

module.exports = router;