const express = require("express");
const userRouter = express.Router();

const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkInput
} = require("../controller/userController");
let {
  signup,
  protectRoute,
  isAuthorized,
  updatePassword, login, forgetPassword, resetPassword
} = require("../controller/authController");

// /api/user=>
// post => user create => name
// Chaining

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/updatePassword").patch(protectRoute, updatePassword);
userRouter.route("/forgetPassword").patch(forgetPassword);
userRouter.route("/resetPassword/:token").patch(resetPassword);


userRouter
  .route("")
  .get(protectRoute, isAuthorized(["admin"]), getAllUser)
  .post(checkInput, createUser);
// /api/user/myuser
// userRouter.route("/myuser").get(getMyuser);

userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
