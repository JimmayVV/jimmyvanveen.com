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
  }
});


// Set the multer upload process
var upload = multer(
{
  storage: storage
}).single('upload');



// Path prefix '/images'

// INDEX route - will list all of the images we have stored
router.get('/', middleware.isLoggedIn, function(req, res)
{
  Image.find({}, null, {sort: {created: -1}}, function(err, allImages)
  {
    if(err)
      console.log(err);
    else
      res.render('images/index', {images: allImages});
  });
});


// NEW route - manual form to upload images with - this will not be used for the most part,
//             as the image upload form is contained within CKEDIT
router.get('/upload', middleware.isLoggedIn, function(req, res)
{
  // Show the form to upload an image
  res.render('images/new');
});


// CREATE route - this will process the upload as well as log it within Mongo
router.post('/upload', middleware.isLoggedIn, function(req, res)
{
  // Generate a shortid, which will be used to create a unique file name, as well as for storing in Mongo
  var imageId = shortid.generate();
  
  // By setting req.shortId outside of the 'upload' method call below, this will ensure that the file name will be set correctly with the shortId
  // See the definition for 'var storage' above for how shortId is incorporated into the filename - we will use shortId below for mongo
  req.shortId = imageId;
  
  // Start the upload process as defined above
  upload(req,res,function(err)
  {
    if(err)
    {
      console.log(err);
      // If err, return out of the function to stop all code, and display the images index page
      return res.redirect('/images');
    }
    // If we made it out of the 'if(err)' condition, then we can assume the file is uploaded to the server.
    // We can now focus on storing the info into Mongo
    
    // Make a JSON object to pass to mongo to store the file data
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
    
    // Make the image in mongodb
    Image.create(newImage, function(err, createdImage)
    {
      if (err)
        console.log(err);
      console.log(req.body);
      res.render('images/upload', {image: createdImage});
    });
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