var Blog = require("../models/blog");
//var Campground = require("../models/campground");

module.exports =
{
  isLoggedIn: function(req, res, next)
  {
      if(req.isAuthenticated())
          return next();

      req.flash("error", "You must be signed in to do that!");
      res.redirect("/login");
  },

  // Checks to make sure the user is logged in, and is the author of this blog,
  // Otherwise, instruct them to log in
  checkUserBlog: function(req, res, next)
  {
    if(req.isAuthenticated())
    {
      // If the user is logged in, then find the blog post to see if this user
      // is the author
      Blog.findOne({shortId: req.params.id}, function(err, blog)
      {
        // Check if no blog was found, if so, send back to blogs index
        if (JSON.stringify(blog) === "null" || err)
        {
          req.flash("error", "No blog found with that id!");
          return res.redirect("/blogs");
        }
        else
        {
          // If the blog Author matches the logged in id, then proceed using 'next()'
          if(blog.author.id.equals(req.user._id))
            next();
          else
          {
            req.flash("error", "You don't have permission to do that!");
            res.redirect("/blogs/" + req.params.id);
          }
        }
      });
    }
    else
    {
      // Since they are not logged in, say so via flash, then redirect to login
      req.flash("error", "You need to be signed in to do that!");
      res.redirect("/login");
    }
  }
}
  
    /*,
    checkUserCampground: function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, campground){
               if(campground.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   console.log("BADD!!!");
                   res.redirect("/campgrounds/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("/login");
        }
    },
    checkUserComment: function(req, res, next){
        console.log("YOU MADE IT!");
        if(req.isAuthenticated()){
            Comment.findById(req.params.commentId, function(err, comment){
               if(comment.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("/campgrounds/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("login");
        }
    }*/