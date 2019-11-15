const express = require("express");
const planRouter = express.Router();
const { protectRoute, isAuthorized } = require("../controller/authController");
const {
  getAllPlan,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  addqueryParams
} = require("../controller/planController");
planRouter
  .route("")
  .get(protectRoute, getAllPlan)
  .post(protectRoute, isAuthorized(["admin","Restaurant Owner"]), createPlan);
planRouter.route("/best-5-plans").get(addqueryParams, getAllPlan);
planRouter
  .route("/:id")
  .get(getPlan)
  .patch(updatePlan)
  .delete(deletePlan);
module.exports = planRouter;
