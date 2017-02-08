var express     = require('express');
var router      = express.Router();
var middleware  = require("../middleware");
var nodemailer  = require('nodemailer');
var recaptcha2  = require('recaptcha2');


// Create a transporter object for use with the nodemailer module
var transporter = nodemailer.createTransport(
{
  service: 'gmail',
  auth: {
    user: 'jimmy.van.veen@gmail.com',
    pass: 'ovuyhibwbrtddcmd'
  }
});


// Set up recaptcha
var recaptcha = new recaptcha2(
{
  siteKey:'6Ld-sRQUAAAAALhT9SxLPj3T73bcYYaIgQ-NrmI3',
  secretKey:'6Ld-sRQUAAAAACRCCHhz1jBnMNNstuFGL_CmPGEp'
});


// INDEX ROUTE
router.get("/", function(req, res)
{
  res.render('contact/index');
});


// CREATE ROUTE
router.post("/", function(req, res)
{
  // Make a contact object to send back to the contact page
  var contact = {title: middleware.sanitize(req.body.title), content: middleware.sanitize(req.body.content) };
  
  // Validate recaptcha
  recaptcha.validateRequest(req)
  .then(function()  // Valid recaptcha
  {
    // Create the message
    var message =
    {
      from: '"JimmyVanVeen.com" <jimmy@jimmyvanveen.com>',  // sender address
      to: 'jimmy.van.veen@gmail.com',                       // list of receivers
      subject: 'WEB PAGE CONTACT: ' + contact.title,        // Subject line
      text: contact.content                                 // plain text body
    };
    
    // Now send the email
    transporter.sendMail(message, (error, info) =>
    {
      if (error)
      {
        console.log('Error occurred');
        req.flash("error", error.message);
        console.log(error.message);
        return;
      }
      
      var flash = 'Message sent successfully!';
      
      console.log(flash);
      req.flash("success", flash);
      console.log('Server responded with "%s"', info.response);
      transporter.close();
      res.redirect('/');
    });
  })
  .catch(function(errorCodes)
  { // invalid recaptcha
    req.flash("error", "Captcha not verified successfully");// translate error codes to human readable text
    res.render('contact/index', {contact: contact});
  });
});


module.exports = router;