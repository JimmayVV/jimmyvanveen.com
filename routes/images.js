var express     = require('express');
var router      = express.Router();
var passport    = require('passport');
var shortid     = require('shortid');
var fs          = require('fs');
var aws         = require('aws-sdk');
var multer      = require('multer');
var multerS3    = require('multer-s3');
const bucket    = 'jimmyvanveen-bucket';
var middleware  = require('../middleware');
var User        = require('../models/user');
var Image       = require('../models/image');


// Set up the AWS credentials, then spin up a S3 object (must set credentials first, or else it won't work)
aws.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

// Spin up a aws.S3 object from aws-sdk
var s3 = new aws.S3();


// MULTER setup
var upload = multer(
{
  storage: multerS3(
  {
    s3: s3,
    bucket: bucket,
    acl: 'public-read',
    metadata: function (req, file, cb)
    {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb)
    {
      // This is where we will set the filename - using Date.now() to ensure uniquness
      cb(null, Date.now() + '_' + file.originalname);
    }
  })
}).single('upload');



// Start routes
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
  // We can now focus on storing the info into Mongo and sending to AWS S3
  // Thanks to: http://webrocom.net/aws-nodejs-sdk-upload-image-s3-bucket/
  upload(req, res, function (err)
  {
    if (err)
    {
      console.log("Error uploading data: ", err);
      res.status(400).send("Failed to upload file - check logs");
    }
    else
    {
      // Everything went fine
      // Make a JSON object to pass to mongo to store the file data
      var newImage = 
      {
        shortId:  shortid.generate(),
        filename: 'https://' + bucket + '.s3.amazonaws.com/' + req.file.key,
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
        // Send the image object to the upload page - which will send the data back to CKEDITOR for immediate use
        res.render('images/upload', {image: createdImage});
      });
    }

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
    
    // Delete the file from AWS S3
    
    // Delete the file from the server using the URL
    /*fs.unlink('./public/uploads/' + foundImage.filename, function(err)
    {
      if (err) console.log("There was a problem deleting the file");
    });*/
    
    // Now remove the entry from the DB
    foundImage.remove();
    
    // Redirect to the images page
    return res.redirect('/images');
  });
});


module.exports = router;