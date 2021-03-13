const express = require("express");
const { body, validationResult } = require("express-validator");

let Post = require("../models/post");
let User = require("../models/user");

//GET POST CREATE FORM
exports.postGet = function (req, res, next) {
  res.render("post");
};

//POST CREATE POST
exports.postPost = [
  body("title").isLength({ min: 1 }).withMessage("Debes agregar un titulo"),
  body("text").isLength({ min: 1 }).withMessage("Debes agregar un contenido"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("post", { errors: errors.array() });
    } else {
      const post = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user,
      }).save((err) => {
        if (err) return next(err);
        //Success
        res.redirect("/home");
      });
    }
  },
];
