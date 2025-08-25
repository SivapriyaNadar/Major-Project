const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//controller
const userController = require("../controllers/users.js");

//signup
router
    .route("/signup")
    .get(
        userController.renderSignUpForm
    )
    .post( 
        wrapAsync(userController.signup)
    );


//login
router
    .route("/login")
    .get(
        userController.renderLoginForm
    )
    .post(
        saveRedirectUrl, 
        passport.authenticate("local", {failureRedirect: "/login", failureFlash: true }) ,
        userController.login
    );


//logout
router.get(
    "/logout",
    userController.logout
);

//User profile
router
    .route("/userprofile/:userId")
    //view user prof
    .get(
        userController.userProfile
    )
    //update user info
    .post(
        userController.userProfileUpdation
    )

//render edit form
router
    .get(
        "/userprofile/:userId/editUser",
        userController.renderEditUserForm
    )

router
.get("/host",
    userController.hostNew,
)


module.exports = router;