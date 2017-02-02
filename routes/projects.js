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
  res.send(JSON.stringify(req.body.project) + "\n\n" + JSON.stringify(req.body.startDate) + "\n\n" + JSON.stringify(req.body.endDate));
  /*
  // Get all the title & content from the passed in parameters
  var title = req.body.title;
  var content = middleware.sanitize(req.body.content);
  // Set author to the current id (and username)
  var author =
  {
    id: req.user._id,
    username: req.user.username
  };

  // JSON to be passed into Blog.create()
  var newBlog = {title: title, content: content, author: author};

  // Make the blog, then redirect to the blogs index
  Blog.create(newBlog, function(err, createdBlog)
  {
    if (err)
      console.log(err);

    res.redirect("/blogs");
  });*/
});


// SHOW ROUTE
router.get("/:id", function(req, res)
{
  /*
  // Get the blog
  Blog.findOne({shortId: req.params.id}, function(err, foundBlog)
  {
    // If one doesn't exist, redirect to the main blogs page, otherwise, show it
    if(err)
       res.redirect("/blogs");
    else
       res.render("blogs/show", {blog: foundBlog});
  });*/
});


// EDIT ROUTE
router.get("/:id/edit", middleware.checkUserProject, function(req, res)
{
  /*
  // Find the blog based on id, then send it to the edit page to be rendered for editing
  Blog.findOne({shortId: req.params.id}, function(err, foundBlog)
  {
    if(err)
        res.redirect("/blogs");
    else
        res.render("blogs/newEdit", {blog: foundBlog});
  });*/
})


// UPDATE ROUTE
router.put("/:id", middleware.checkUserProject, function(req, res)
{
  /*
  var title = req.body.title;
  var content = middleware.sanitize(req.body.content);

  Blog.findOneAndUpdate(
  {
    shortId: req.params.id  // Find the blog by id
  },
  {
    title: title, content: content // Update the title and content
  },
  function(err, updatedBlog)
  {
    if(err)
      res.redirect("/blogs");
    else
      res.redirect("/blogs/" + req.params.id);  // Send the user to the show page
  });*/
});


// DELETE ROUTE
router.delete("/:id", middleware.checkUserProject, function(req, res)
{
  /*
  //Destroy the blog
  Blog.findOneAndRemove({shortId: req.params.id}, function(err)
  {
    if(err)
      console.log(err);

    res.redirect("/blogs");
  });*/
});



module.exports = router;