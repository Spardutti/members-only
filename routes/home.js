const express = require("express");
const router = express.Router();
const session = require("express-session");
const LocalStrategy = require("passport").Strategy;


let userController = require("../controllers/userController");


//HOME PAGE
router.get("/home", userController.home);

//SIGN UP GET
router.get("/signin", userController.signIn)

//SIGN UP POST 
router.post("/signin", userController.signInPost);

//LOG IN GET
router.get("/login", userController.logIn);

//LOG IN POST
router.post("/login", userController.logInPost);

module.exports = router;