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
        res.render("blogs/index", {blogs: allBlogs});
   });
});

// NEW ROUTE
router.get("/new", function(req, res)
{
  res.render("blogs/new");
});

// CREATE ROUTE
router.post("/", function(req, res)
{
  var title = req.body.title;
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
router.get("/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
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