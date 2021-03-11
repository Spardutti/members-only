const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

let User = require("../models/user");

//SIGN UPFORM GET
exports.signUp = function (req, res, next) {
  res.render("signUp");
};

//SIGN UP FORM POST
exports.signUpPost = [
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

  body("user")
    .isLength({ min: 4 })
    .withMessage("Usuario minimo 4 caracteres")
    .isAlphanumeric()
    .withMessage("Usuario debe contener Solo letras y numeros"),

  body("pass")
    .isLength({ min: 6 })
    .withMessage("contraseña minimo 6 caracteres"),

  body("passconfirm", "las contraseñas deben coincidir")
    .exists()
    .custom((value, { req }) => value === req.body.pass),

  (req, res, next) => {
    // create a variable with all the erros of the validation
    const errors = validationResult(req);

    //if errors !empty display the form with the errors
    if (!errors.isEmpty()) {
      res.render("signUp", { errors: errors.array() });
    } else {
      //check if the username already exist
      User.findOne({ username: req.body.user }).exec((err, userExist) => {
        if (err) return next(err);
        if (userExist) {
          res.render("signUp", { error: "El usuario ya existe" });
        }
        //encrypt password
        else {
          bcrypt.hash(req.body.pass, 10, function (err, hash) {
            const user = new User({
              username: req.body.user,
              firstName: req.body.name,
              lastName: req.body.lastname,
              password: hash,
            }).save((err) => {
              if (err) return next(err);
              //Success
              res.redirect("/");
            });
          });
        }
      });
    }
  },
];
