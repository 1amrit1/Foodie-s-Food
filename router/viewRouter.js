const express = require("express");
const { getHomePage, getPlansPage, getLoginPage, getSignupPage, getProfilePage, getUpdatePasswordPage, getForgetPasswordPage, getResetPage } = require("../controller/viewController");
const { protectRoute,isloggedIn} = require("../controller/authController");
const viewRouter = express.Router();
viewRouter.use(isloggedIn);
viewRouter.route("").get(getHomePage);
viewRouter.route("/plan").get(getPlansPage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignupPage);
viewRouter.route("/me").get( getProfilePage);
viewRouter.route("/updatePassword").get(getUpdatePasswordPage);
viewRouter.route("/forgetPassword").get(getForgetPasswordPage);
viewRouter.route("/resetPassword").get(getResetPage);
viewRouter.route("/resetPassword/:id").get(getResetPage);
// viewRouter.route("/updateUser").get(error404, getUpdateUserPage);

module.exports = viewRouter;
