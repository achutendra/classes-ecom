const express = require("express");
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getUser, updateUserRole, deleteUser } = require("../controllers/userController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth.js");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.get("/logout", logout);

router.route("/forget-password").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.get("/me", isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUser);

router.route("/admin/user/role/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);

router.route("/admin/delete/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;