const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
    res.render("./users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm =(req, res) => {
    res.render("./users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success","Welcome back to Wanderlust. You are Logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    res.redirect(redirectUrl);
}

module.exports.userProfile = async (req, res) => {
    let {userId} = req.params;
    const userInfo = await User.findById(userId);
    res.render("./users/profile.ejs" , {userInfo});
}

module.exports.renderEditUserForm = async (req, res) => {
    let {userId} = req.params;
    const userInfo = await User.findById(userId);
    // console.log(req.body);
    // const userInfo = await User.findByIdAndUpdate(
    //     userId,
    //     {...req.body.user}
    // );
    // console.log(userInfo);
    res.render("./users/editUser.ejs" , {userId, userInfo});
}

module.exports.userProfileUpdation = async (req, res) => {
    let {userId} = req.params;
    let userInfo = await User.findByIdAndUpdate(
        userId,
        { ...req.body.user}
    )
    req.flash("success", "User Information Updated!");
    res.redirect(`/userprofile/${userId}`);
}

module.exports.hostNew = async (req, res) => {
    res.send("welcome");
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are Logged Out.");
        res.redirect("/listings");
    })
}