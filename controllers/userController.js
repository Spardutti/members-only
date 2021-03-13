const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

let User = require("../models/user");
let Post = require("../models/post");

//HOME
exports.home = function (req, res, next) {
  Post.find({}, "author title text")
    .populate("author")
    .exec(function (err, postlist) {
      if (err) return next(err);
      //Success
      res.render("home", { posts: postlist });
    });
};

//SIGN UPFORM GET
exports.signIn = function (req, res, next) {
  res.render("signIn");
};

//SIGN UP FORM POST
exports.signInPost = [
  //VALIDATE FIELDS
  body("name")
    .isLength({ min: 1 })
    .escape()
    .isAlpha()
    .withMessage("nombre debe contener solo letras"),

  body("lastname")
    .isLength({ min: 1 })
    .isAlpha()
    .withMessage("apellido debe contener solo letras"),

  body("username")
    .isLength({ min: 4 })
    .withMessage("Usuario minimo 4 caracteres")
    .isAlphanumeric()
    .withMessage("Usuario debe contener Solo letras y numeros"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("contraseña minimo 6 caracteres"),

  body("passconfirm", "las contraseñas deben coincidir")
    .exists()
    .custom((value, { req }) => value === req.body.password),

  (req, res, next) => {
    // create a variable with all the erros of the validation
    const errors = validationResult(req);

    //if errors !empty display the form with the errors
    if (!errors.isEmpty()) {
      res.render("signIn", { errors: errors.array() });
    } else {
      //check if the username already exist
      User.findOne({ username: req.body.username }).exec((err, userExist) => {
        if (err) return next(err);
        if (userExist) {
          res.render("signIn", { error: "El usuario ya existe" });
        }
        //encrypt password
        else {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            const user = new User({
              username: req.body.username,
              firstName: req.body.name,
              lastName: req.body.lastname,
              password: hash,
            }).save((err) => {
              if (err) return next(err);
              //Success
              res.redirect("/logIn");
            });
          });
        }
      });
    }
  },
];

//LOG IN GET
exports.logIn = function (req, res, next) {
  res.render("logIn");
};

//LOG IN POST
exports.logInPost = function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/logIn",
  })(req, res, next);
};


// LOG OUT GET
exports.logOut = function (req, res, next) {
  req.logout();
  res.redirect("/home");
}