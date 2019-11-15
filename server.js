// const makes reference constant
// let ,const => behave like java
const server = require("./api");
const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Server is running at port 3000");
});







































// Read File

// console.log(JSON.parse(users));
// middleware

// /api/plan=> get all Plans
// /api/user=> get all users

// /api/user/3=>get User
// app.get("/api/user/")
// // /api/user=> Post user=> create  a new user
// // /api/user/3=> Patch User=> update existing user
// // /api/user/3=> Data Deleted

// app.get("/api/user/profilepage", function(req, res) {
//   // console.log(req.params);
//   res.status(200).json({
//     sucess: "ProfilePage accepted successfully",
//     data: " Request accepted successfully"
//   });
// });

// Handlers
// users

// plans

// Routes
// user

//plans

// /api/user/1

// app.post("/api/user", createUser);
// app.get("/api/user", getAllUser);
// app.get("/api/plan", function(req, res) {});

// CRUD
//

// It Will run everytime
// // middleware
// app.use(function(req, res, next) {
//   const data = "Request processed successfully";
//   // res.status(200).json({
//   //   status: "successfull",
//   //   data
//   // });
//   // modify plan
//   var key = Object.keys(req.body)[0];
//   // console.log(key);
//   if (req.body[key] == "rtyuin") {
//     req.name = "Vishal";
//   }
//   req.myproperty = "I have modified the request";
//   next();
// });
// app.get("/", function(req, res) {
//   const data = "Request processed from home successfully" + req.myproperty;
//   res.status(200).json({
//     status: "successfull",
//     data
//   });
// });

// app.post("/", function(req, res) {
//   const data = "Request processed from home successfully" + req.myproperty;
//   res.status(200).json({
//     status: "successfull",
//     data
//   });
// });
