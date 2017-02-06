var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Project = require("../models/project");

//root route
router.get("/", function(req, res)
{
  Project.find({}, null, {sort: {started: -1}}, function(err, allProjects)
  {
    if(err)
      console.log("ERROR with projects:\n" + err);
    
    res.render("home", {allProjects: allProjects});
  });
});

// REGISTER is now disabled, but commented out code will work if you want to enable registration again
// show register form
router.get("/register", function(req, res)
{
  res.redirect("/login");
  //res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res)
{
  res.redirect("/login");
  /* - Commented out, because registration is disabled
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user)
  {
    if(err)
    {
      console.log(err);
      req.flash("error", err.message);
      return res.render("register");
    }

    passport.authenticate("local")(req, res, function()
    {
      req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
      res.redirect("/");
    });
  });*/
});

//show login form
router.get("/login", function(req, res)
{
  res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
{
  successRedirect: "/",
  failureRedirect: "/login"
}), function(req, res){
});

// logout route
router.get("/logout", function(req, res)
{
   req.logout();
   req.flash("success", "LOGGED YOU OUT!");
   res.redirect("/");
});


module.exports = router;