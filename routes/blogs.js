var express = require("express");
var router  = express.Router();
var passport = require("passport");
var middleware = require("../middleware");
var User = require("../models/user");
var Blog = require("../models/blog");


// INDEX ROUTE
router.get("/", function(req, res)
{
  // Get all blogs from the server, then render it
   Blog.find({}, function(err, allBlogs)
   {
     if(err)
         console.log("ERROR!");
     else
        res.render("blogs/index", {allBlogs: allBlogs});
   });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res)
{
  res.render("blogs/new");
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res)
{
  var title = req.body.title;
  var content = req.sanitize(req.body.content);
  var author =
  {
    id: req.user._id,
    username: req.user.username
  };

  var newBlog = {title: title, content: content, author: author};

  //console.log("Title:\n" + title + "\n\nContent:" + content);

  Blog.create(newBlog, function(err, createdBlog)
  {
    if (err)
    {
      console.log(err);
    }
    else
    {
      console.log(createdBlog);
    }
    res.redirect("/blogs");
  });
});

// SHOW ROUTE
router.get("/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog)
  {
    if(err)
       res.redirect("/blogs");
    else
       res.render("blogs/show", {blog: foundBlog});
  })
});

// EDIT ROUTE
router.get("/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
})


// UPDATE ROUTE
router.put("/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

// DELETE ROUTE
router.delete("/:id", function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   })
   //redirect somewhere
});



module.exports = router;