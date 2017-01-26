var express     = require('express');
var router      = express.Router();
var passport    = require('passport');
var multer      = require('multer');
var shortid     = require('shortid');
var fs          = require('fs');
var middleware  = require('../middleware');
var User        = require('../models/user');
var Image       = require('../models/image');


// Set up multer variables
// multers disk storage settings
var storage = multer.diskStorage(
{ 
  destination: function (req, file, cb)
  {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb)
  {
    cb(null, req.shortId + '_' + file.originalname);
    /*var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])*/
  }
});

var upload = multer(
{
  storage: storage
}).single('file');



// Path prefix '/images'

// INDEX route - will list all of the images we have stored
router.get('/', middleware.isLoggedIn, function(req, res)
{
  // Show the index of all the uploaded images, as well as the form to upload them
  res.render('images/index');
});


// NEW route - will list all of the images we have stored
router.get('/upload', middleware.isLoggedIn, function(req, res)
{
  // Show the index of all the uploaded images, as well as the form to upload them
  res.render('images/upload');
});


// SHOW the json of all the stored images
router.get('/json', middleware.isLoggedIn, function(req, res)
{
  Image.find({}, function(err, allImages)
  {
    if(err)
      res.status(400).json({error: err});
    else
      res.status(200).json({images: allImages});
  });
});


// Simple post function to complete the upload
router.post('/upload', middleware.isLoggedIn, function(req, res)
{
  var imageId = shortid.generate();
  req.shortId = imageId;
  
  upload(req,res,function(err)
  {
    if(err) // If err, return out of function with error json
      return res.json({error_code:1,err_desc:err});
     
    // If successful upload, then save data to mongo, and pass successful json
    console.log(req.file);
    
    var newImage = 
    {
      shortId:  imageId,
      filename: req.file.filename,
      author:
      {
        id: req.user._id,
        username: req.user.username
      }
    };
    
    // Make the blog, then redirect to the blogs index
    Image.create(newImage, function(err, createdImage)
    {
      if (err)
        console.log(err);
    });
    
    res.json({error_code:0,err_desc:null});
  });
});


// DELETE route - to delete an image from the server & DB
router.delete('/:id', middleware.isLoggedIn, function(req, res)
{
  // Find the image details from the server
  Image.findOne({shortId: req.params.id}, function(err, foundImage)
  {
    if (err)
      return res.redirect('/images');
    
    // Delete the file from the server using the URL
    fs.unlink('./public/uploads/' + foundImage.filename, function(err)
    {
      if (err) console.log("There was a problem deleting the file");
    });
    
    // Now remove the entry from the DB
    foundImage.remove();
    
    // Redirect to the images page
    return res.redirect('/images');
  });
});


module.exports = router;