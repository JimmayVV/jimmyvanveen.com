var express = require("express");
var router  = express.Router();
var passport = require("passport");
var sanitizeHtml = require("sanitize-html")
var middleware = require("../middleware");
var User = require("../models/user");
var Blog = require("../models/blog");

// Setup a custom sanitization function
var sanitize = function(doc)
{
  return sanitizeHtml(doc, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
    allowedAttributes: {
      a: [ 'href', 'name', 'target' ],
      img: [ 'src' ],
      '*' : [ 'class' ]
    },
  });
};


// INDEX ROUTE
router.get("/", function(req, res)
{
  // Get all blogs from the server, then render it
  Blog.find({}, null, {sort: {created: -1}}, function(err, allBlogs)
  {
   if(err)
       console.log("ERROR!\n" + err);
   else
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
  // Get all the title & content from the passed in parameters
  var title = req.body.title;
  var content = sanitize(req.body.content);
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
  // Get the blog
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
  // Find the blog based on id, then send it to the edit page to be rendered for editing
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
  var title = req.body.title;
  var content = sanitize(req.body.content);

  Blog.findOneAndUpdate(
    {shortId: req.params.id}, // Find the blog by id
    {title: title, content: content}, // Update the title and content
    function(err, updatedBlog)
  {
    if(err)
      res.redirect("/blogs");
    else
      res.redirect("/blogs/" + req.params.id);  // Send the user to the show page
  });
});


// DELETE ROUTE
router.delete("/:id", middleware.checkUserBlog, function(req, res)
{
  //Destroy the blog
  Blog.findOneAndRemove({shortId: req.params.id}, function(err)
  {
    if(err)
      console.log(err);

    res.redirect("/blogs");
  });
});



module.exports = router;