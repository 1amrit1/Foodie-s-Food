const express = require("express");
const cookieParser = require("cookie-parser");
// const pug = require("pug");
//
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
const userRouter = require("./router/userRouter");
const planRouter = require("./router/planRouter");
const viewRouter = require("./router/viewRouter");
const bookingRouter = require("./router/bookingRouter");
// Middleware
//  to serve static files
app.use(express.static("public"));
// to express to not to ignore icoming json data from body
app.use(express.json());
// Sub Apps
// Routes
//templating engine=> handlebar,EJS ,pug
app.set("view engine", "pug");
// template folder
app.set("views", "view");
// app.get("/", function(req, res) {
//   res.status(200).render("home.pug");
// });
// app.get("/plan", function(req, res) {
//   res.status(200).render("plan.pug");
// });
// /plans
app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/plan", planRouter);
app.use("/", viewRouter);
// app.use("", function(req, res) {
//   res.status(200).json({
//     Result: "Response from api"
//   });
// });
module.exports = app;
