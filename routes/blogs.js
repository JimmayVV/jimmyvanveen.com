var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var Blog = require("../models/blog");


// INDEX ROUTE
router.get("/", function(req, res)
{
  // Get all blogs from the server, then render it
  Blog.find({}, null, {sort: {created: -1}}, function(err, allBlogs)
  {
    if(err)
      console.log("ERROR!\n" + err);

    res.render("blogs/index", {allBlogs: allBlogs});
  });
});


// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res)
{
  // Simply render the blog entry view
  res.render("blogs/newEdit");
});


// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res)
{
  // Get the title & content from the passed in parameters
  var title = middleware.sanitize(req.body.title);
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
  });
});


// SHOW ROUTE
router.get("/:id", function(req, res)
{
  // Get the blog (find by shortId)
  Blog.findOne({shortId: req.params.id}, function(err, foundBlog)
  {
    // If one doesn't exist, redirect to the main blogs page, otherwise, show it
    if(err)
       res.redirect("/blogs");
    else
       res.render("blogs/show", {blog: foundBlog});
  });
});


// EDIT ROUTE
router.get("/:id/edit", middleware.checkUserBlog, function(req, res)
{
  // Find the blog based on shortId, then send it to the edit page to be rendered for editing
  Blog.findOne({shortId: req.params.id}, function(err, foundBlog)
  {
    if(err)
        res.redirect("/blogs");
    else
        res.render("blogs/newEdit", {blog: foundBlog});
  });
})


// UPDATE ROUTE
router.put("/:id", middleware.checkUserBlog, function(req, res)
{
  // Get the title & content from the passed in parameters
  var title = middleware.sanitize(req.body.title);
  var content = middleware.sanitize(req.body.content);

  // Find the blog by shortId, then update it
  Blog.findOneAndUpdate(
  {
    shortId: req.params.id  // Find the blog by id
  },
  {
    title: title, content: content // Update the title and content
  },
  function(err, updatedBlog)
  {
    // If there was an error, redirect to the main blogs page, otherwise send to the specific blog edited 'show' page
    if(err)
      res.redirect("/blogs");
    else
      res.redirect("/blogs/" + req.params.id);  // Send the user to the show page
  });
});


// DELETE ROUTE
router.delete("/:id", middleware.checkUserBlog, function(req, res)
{
  //Destroy the blog, find by shortId
  Blog.findOneAndRemove({shortId: req.params.id}, function(err)
  {
    if(err)
      console.log(err);

    res.redirect("/blogs");
  });
});



module.exports = router;