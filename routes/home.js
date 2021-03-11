const express = require("express");
const router = express.Router();
const session = require("express-session");
const LocalStrategy = require("passport").Strategy;


let userController = require("../controllers/userController");


//SIGN UP GET
router.get("/signup", userController.signUp)

//SIGN UP POST 
router.post("/signup", userController.signUpPost);


module.exports = router;