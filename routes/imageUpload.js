var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var multer      = require('multer');
var middleware  = require("../middleware");
var User        = require("../models/user");


// Set up multer variables
// multers disk storage settings
var storage = multer.diskStorage(
{ 
  destination: function (req, file, cb)
  {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb)
  {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});

var upload = multer(
{
  storage: storage
}).single('file');



// Path prefix '/images'

// Index route - will list all of the images we have stored
router.get('/', middleware.isLoggedIn, function(req, res)
{
  // Show the index of all the uploaded images, as well as the form to upload them
  res.render('images/index');
});


// Simple post function to complete the upload
router.post('/upload', function(req, res)
{
  upload(req,res,function(err)
  {
    if(err)
    {
      res.json({error_code:1,err_desc:err});
      return;
    }
    // TODO: log this image in the database so we can list them all
    res.json({error_code:0,err_desc:null});
  });
});

/*
// TODO: Allow deletes
router.delete('/:id', function(req, res)
{
  // Delete the image
});
*/

module.exports = router;