const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const secret = "mysecret";
const email = require("../utility/email.js");
// define secret key
module.exports.signup = async function (req, res) {
  try {
    // 1. create user
    const user = await userModel.create(req.body);
    // 2. payload
    const id = user["_id"];
    //jwt.sign
    const token = await jwt.sign({ id }, secret);
    res.cookie("jwt", token, {
      httpOnly: true
    });
    res.status(201).json({
      success: "User  Created ",
      user
    });
  }
  catch (err)  {   
    res.status(201).json({
      failed: "operation failed",
      error: err
    });
  }
};
module.exports.login = async function (req, res) {
  // 1. create user
  try {

    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const dbpassword = user.password;
      const enteredPass = req.body.password;
      // console.log(user);
      // 2. payload
      const id = user["_id"];
      if (dbpassword == enteredPass) {
        const token = await jwt.sign({ id }, secret);
        res.cookie("jwt",token,{
          httpOnly:true
        });
        return res.status(201).json({
          success: "User  logged In",
          user
        });
      } else {
        return res.status(201).json({
          data: "please enter correct email or password"
        });
      }
    } else {
      res.status(201).json({ data: "user not found" });
    }
    //jwt.sign
  } catch (err) {
    res.status(401).json({
      data: err
    });
  }
};
module.exports.logout = function (req, res) {
  res.cookie("jwt", "randomString", {
    httpOnly: true,
    expires:new Date(Date.now()+10)
  });
  res.redirect("/"); 
}
module.exports.protectRoute = async function (req, res, next) {
  const token = req.cookies ? req.cookies.jwt : null|| req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  try {
    if (token) {
      const ans = await jwt.verify(token, secret);
      // console.log(ans);
      if (ans) {
        const user = await userModel.findOne({ _id: ans.id });
        req.role = user.role;
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          data: "Something went wrong please login again"
        });
      }
    } else {
      return res.status(401).json({
        data: "User not logged in"
      });
    }
  } catch (err) {
    res.json({
      data: err
    });
  }
};

module.exports.isloggedIn = async function (req, res, next) {
  const token = req.cookies ? req.cookies.jwt : null || req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  try {
    if (token) {
      const ans = await jwt.verify(token, secret);
      // console.log(ans);
      if (ans) {
        const user = await userModel.findOne({ _id: ans.id });
        req.role = user.role;
        req.user = user;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    res.json({
      data: err
    });
  }
};

module.exports.isAuthorized = function (roles) {
  return function (req, res) {
    // console.log(roles);
    if (roles.includes(req.role)) {
      next();
    } else {
      res.status(401).json({
        data: "You are not authorized"
      });
    }
  };
  //1. Get  user
  // 2. User role
  // 3.role==admin
  // if(res.role==)
};
module.exports.updatePassword = async function (req, res) {
  const user = req.user;
  if (req.body.password && req.body.newpassword && req.body.confirmpassword) {
    const prevPass = req.body.password;
    const newPass = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (user.password == prevPass) {
      user.password = newPass;
      user.confirmpassword = confirmpassword;
      await user.save();
      
      return res.json({
        success: "password updated"
      });
    }
  } else {
    return res.json({
      data: "Please enter correct input"
    });
  }
};

// forget Password

// reset Password
// res.status(201).json({
//   data: req.headers
// });

module.exports.forgetPassword = async function (req, res) {
  //1.  findOne using email
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {

      // 2. add token property to that user

      const token = user.generateToken();

      await user.save({ validateBeforeSave: false });//since it will validate and will do password === undefined(confirmPassword)
      let options = {
        to: user.email,
        subject: "help for forgotten password",
        text: token,
        html: `<h1>TOKEN FOR FORGOTTEN PASSWORD</h1> <p>${token}</p>`

      }
      await email(options);
      res.status(201).json({
        success: "token sent to your registered emeal id"
      })
    } else {
      res.json({
        data: "user not found!! DONT TRY TO HACK!!"
      })
    }
    // 3. send token to the client
  } catch (err) {
    console.log(err);
    res.json({ data: err });
  }
};

module.exports.resetPassword = async function (req, res) {

  const user = await userModel.findOne(req.params)
  if (user) {
    let newPass = req.body.password;
    let newCPass = req.body.confirmpassword;
    user.password = newPass;
    user.confirmpassword = newCPass;
    user.token = undefined;
    await user.save();
    return res.json({
      success: "password updated",
      user
    });
  } else {
    res.json({ 
      data: "token is incorrect, dont try to hack!!" });
  }
}