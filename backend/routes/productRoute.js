const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview,  } = require("../controllers/productController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth.js");

const router = express.Router();

// router.route("/products").get(isAuthenticatedUser ,getAllProducts);
router.get("/products", getAllProducts);   
router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/reviews").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get( getProductReviews).delete(isAuthenticatedUser, deleteReview);

router.get("/try", () => {
    res.send("Hello World");
});


module.exports = router;