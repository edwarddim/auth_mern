const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const {secretKey} = require("../config/jwt.config")

module.exports.register = (req,res) => {
    const user = new User(req.body);
    user
        .save()
        .then(() => {
            res.json({ msg: "success!", user: user });
        })
        .catch(err => res.status(400).json(err));
}

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user === null) {
        res.json({ msg: "invalid login attempt: USER NOT FOUND" });
      } 
      else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(passwordIsValid => {
            if (passwordIsValid) {
              // CREATE A NEW JWT IF PASSWORD AND EMAIL MATCH
              const newJWT = jwt.sign({
                    _id: user._id
              },secretKey)
              // TAKES THE NEW JWT AND SENDS IT BACK TO USER ATTACHED TO 
              // RESPONSE 
              res.cookie("usertoken", newJWT, {httpOnly: true})
                .json({ msg: "success!" });
            } 
            else {
              res.json({ msg: "invalid login attempt: PASSWORD NOT VALID" });
            }
          })
          .catch(err => res.json({ msg: "invalid login attempt: PASSWORD ERROR CATCH" }));
      }
    })
    .catch(err => res.json(err));
}

module.exports.getAll = (req, res) => {
    User.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
}

module.exports.logout = (req,res) =>{

  res.clearCookie("usertoken");
}