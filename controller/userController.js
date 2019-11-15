const fs = require("fs");
// const path = require("path");
const userModel = require("../model/userModel");
// const users = fs.readFileSync("./data/user.json");
// const users=require(``);
// const parsedUser = JSON.parse(users);
module.exports.getAllUser = function(req, res) {
  // console.log(req.params);
  res.status(200).json({
    sucess: "Params accepted successfully",
    data: parsedUser
  });
};
module.exports.updateUser = async function(req, res) {
  // console.log(req.params);
  // req.body;

  const { id } = req.params;

  const updatedUser = await userModel.findByIdAndUpdate(id, { new: true });
  res.status(200).json({
    sucess: "User Data updated Successfully",
    data: updatedUser
  });


  // let user = parsedUser[id - 1];
  // console.log(user);
  // console.log("````````````````````````");
  // let data = req.body;
  // console.log(data);
  // console.log("````````````````````````");
  // const key = Object.keys(data)[0];
  // console.log("````````````````````````");
  // console.log("User[key]" + user[key]);
  // console.log("````````````````````````");
  // console.log("data[key]" + data[key]);
  // user[key] = data[key];
  // fs.writeFileSync("./data/user.json", JSON.stringify(parsedUser));
  // console.log(id);
  //  user
};
module.exports.getUser = function(req, res) {
  console.log(req.params);
  const { id } = req.params;
  console.log(id);
  const user = parsedUser[id - 1];
  res.status(200).json({
    sucess: "Params accepted successfully",
    data: user
  });
};
module.exports.checkInput = function(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      return res.status(400).json({
        status: "failed",
        response: "You should enter name  to create a use"
      });
    }
  } else {
    return res.status(400).json({
      status: "failed",
      response: "You should enter some details to create a user"
    });
  }
};
module.exports.createUser = function(req, res) {
  // server
  // id
  const id = parsedUser.length + 1;
  //
  const user = req.body;
  //
  user.id = id;

  parsedUser.push(user);

  fs.writeFileSync("./data/user.json", JSON.stringify(parsedUser));
  // console.log(id);
  //  user
  res.status(200).json({
    sucess: "User added successfully",
    data: user
  });
};
module.exports.deleteUser = function(req, res) {
  res.status(200).json({
    sucess: "User Data Deleted Successfully",
    data: user
  });
};
