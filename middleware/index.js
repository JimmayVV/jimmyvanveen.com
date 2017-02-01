var Blog = require("../models/blog");
var Project = require("../models/project");
var sanitizeHtml = require("sanitize-html");

module.exports =
{
  // Verifies if the user is logged in or not - redirect to login page if not
  isLoggedIn: function(req, res, next)
  {
      if(req.isAuthenticated())
          return next();

      req.flash("error", "You must be signed in to do that!");
      res.redirect("/login");
  }, // END: isLoggedIn

  
  // Checks to make sure the user is logged in, and is the author of this blog, otherwise, instruct them to log in
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
  }, // END: checkUserBlog
  
  
  // Verifies that the user is logged in, and is the author of the project. If not, redirect appropriately
  checkUserProject: function(req, res, next)
  {
    if(req.isAuthenticated())
    {
      // If the user is logged in, then find the project to see if this user
      // is the author
      Project.findOne({shortId: req.params.id}, function(err, project)
      {
        // Check if no blog was found, if so, send back to blogs index
        if (JSON.stringify(project) === "null" || err)
        {
          req.flash("error", "No project found with that id!");
          return res.redirect("/projectss");
        }
        else
        {
          // If the blog Author matches the logged in id, then proceed using 'next()'
          if(project.author.id.equals(req.user._id))
            next();
          else
          {
            req.flash("error", "You don't have permission to do that!");
            res.redirect("/projects/" + req.params.id);
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
  }, // END: checkUserProject
  
  
  // Custom sanitize function for uploading user input
  sanitize: function(doc)
  {
    return sanitizeHtml(doc, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'pre', 'code' ]),
      allowedAttributes: {
        a: [ 'href', 'name', 'target' ],
        img: [ 'src' ],
        code: ['class'],
        '*' : [ 'class' ]
      },
    });
  }
  
}// EOF