const planModel = require("../model/planModel");
module.exports.getHomePage = async function (req, res) {
  let plans = await planModel.find();
  plans = plans.slice(0, 3);
  res.status(200).render("home.pug", {
    plans: plans,
    pageName: "Home Page"
  });
};

module.exports.getPlansPage = async function (req, res) {
  let plans = await planModel.find();
  // get All plans
  res.status(200).render("planPage.pug", {
    plans: plans,
    pageName: "Plan Page"
  });
};
module.exports.getLoginPage = async function (req, res) {
  res.status(200).render("login.pug")
};
module.exports.getSignupPage = async function (req, res) {
  res.status(200).render("signup.pug")
};
module.exports.getProfilePage = async function (req, res) {
  const user = req.user;
  res.status(200).render("me.pug", { user });
};
module.exports.getUpdateUserPage = async function (req, res) {
  const user = req.user;
  res.status(200).render("updateUser.pug", { user });
};
module.exports.getUpdatePasswordPage = async function (req, res) {
  res.status(200).render("updatePassword.pug");
};
module.exports.getForgetPasswordPage = async function (req, res) {
  res.status(200).render("forgetPassword.pug");
};
module.exports.getResetPage = async function (req, res) {
  res.status(200).render("reset.pug");
}