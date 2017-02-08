// PROJECTS routes (controller)

var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var Project = require("../models/project");


// INDEX ROUTE
router.get("/", function(req, res)
{
  Project.find({}, null, {sort: {started: -1}}, function(err, allProjects)
  {
    if(err)
      console.log("ERROR with projects:\n" + err);
    
    res.render('projects/index', {allProjects: allProjects});
  });
});


// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res)
{
  // Simply render the blog entry view
  res.render("projects/newEdit");
});


// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res)
{
  // Determine if the project is current, and set 'current' to true, or false
  var current = (req.body.current === 'true') ? true : false;
  
  // Set started and finished to variables based on passed in params
  var started   = new Date(req.body.startDate.year, req.body.startDate.month, req.body.startDate.day);
  var finished  = new Date(req.body.endDate.year, req.body.endDate.month, req.body.endDate.day);
  
  // Now set finished to the appropriate date if project is marked as current, or is less than the start date (can't end before it started)
  finished = (current || (finished.getTime() < started.getTime())) ? started : finished;
  
  // Make the newProject JSON to be passed into Mongo
  var newProject =
  {
    title:    middleware.sanitize(req.body.title),
    content:  middleware.sanitize(req.body.content),
    image:    middleware.sanitize(req.body.image),
    repo:
    {
      url:      middleware.sanitize(req.body.repo.url),
      location: middleware.sanitize(req.body.repo.location)
    },
    current:  current,
    started:  started,
    finished: finished,
    author:   { id: req.user._id, username: req.user.username }
  };
  
  Project.create(newProject, function(err, createdProject)
  {
    if (err)
      console.log(err);

    res.redirect("/projects");
  });
});


// SHOW ROUTE
router.get("/:id", function(req, res)
{
  // Get the project
  Project.findOne({shortId: req.params.id}, function(err, foundProject)
  {
    // If one doesn't exist, redirect to the main projects page, otherwise, show it
    if(err)
       res.redirect("/projects");
    else
       res.render("projects/show", {project: foundProject});
  });
});


// EDIT ROUTE
router.get("/:id/edit", middleware.checkUserProject, function(req, res)
{
  // Find the blog based on id, then send it to the edit page to be rendered for editing
  Project.findOne({shortId: req.params.id}, function(err, foundProject)
  {
    if(err)
        res.redirect("/projects");
    else
        res.render("projects/newEdit", {project: foundProject});
  });
})


// UPDATE ROUTE
router.put("/:id", middleware.checkUserProject, function(req, res)
{
  // Determine if the project is current, and set 'current' to true, or false
  var current   = (req.body.current === 'true') ? true : false;
  
  // Set started and finished to variables based on passed in params
  var started   = new Date(req.body.startDate.year, req.body.startDate.month, req.body.startDate.day);
  var finished  = new Date(req.body.endDate.year, req.body.endDate.month, req.body.endDate.day);
  
  // Now set finished to the appropriate date if project is marked as current, or is less than the start date (can't end before it started)
  finished = (current || (finished.getTime() < started.getTime())) ? started : finished;

  Project.findOneAndUpdate(
  {
    shortId: req.params.id  // Find the blog by id
  },
  {
    title:    middleware.sanitize(req.body.title),
    content:  middleware.sanitize(req.body.content),
    image:    middleware.sanitize(req.body.image),
    repo:
    {
      url:      middleware.sanitize(req.body.repo.url),
      location: middleware.sanitize(req.body.repo.location)
    },
    started:  started,
    finished: finished,
    current:  current
  },
  function(err, updatedBlog)
  {
    if(err)
      res.redirect("/projects");
    else
      res.redirect("/projects/" + req.params.id);  // Send the user to the show page
  });
});


// DELETE ROUTE
router.delete("/:id", middleware.checkUserProject, function(req, res)
{
  //Destroy the blog
  Project.findOneAndRemove({shortId: req.params.id}, function(err)
  {
    if(err)
      console.log(err);

    res.redirect("/projects");
  });
});



module.exports = router;