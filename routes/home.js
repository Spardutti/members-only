const express = require("express");
const router = express.Router();
const session = require("express-session");
const LocalStrategy = require("passport").Strategy;


let userController = require("../controllers/userController");
let postController = require("../controllers/postController");

router.get("/post", function (req, res, next) {
    res.render("post")
})

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

//LOG OUT GET
router.get("/logout", userController.logOut);

//VIP GET
router.get("/vip", userController.vipGet);

//VIP POST
router.post("/vip", userController.vipPost);

//ADMIN GET
router.get("/admin", userController.admingGet);

//ADMING POST
router.post("/admin", userController.adminPost);

/////////////////////////////////////// POST //////////////////////////////////

//GET POST FORM
router.get("/post", postController.postGet);

//POST POST FORM
router.post("/post", postController.postPost);


//POST DELETE POST
router.post("/post", postController.deletePostPost);

module.exports = router;