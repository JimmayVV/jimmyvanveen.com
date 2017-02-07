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
    pass: 'yourpass'
  }
});


// Set up recaptcha
var recaptcha = new recaptcha2(
{
  siteKey:'6Ld-sRQUAAAAALhT9SxLPj3T73bcYYaIgQ-NrmI3',
  secretKey:'6Ld-sRQUAAAAACRCCHhz1jBnMNNstuFGL_CmPGEp'
});

/* USE this template to make mail
var mailOptions = 
{
  from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
  to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ?', // plain text body
  html: '<b>Hello world ?</b>' // html body
};
*/

// INDEX ROUTE
router.get("/", function(req, res)
{
  res.render('contact/index');
});

// req.flash("error", "LOGGED YOU OUT!");
// req.flash("success", "LOGGED YOU OUT!");

// CREATE ROUTE
router.post("/", function(req, res)
{
  // Validate recaptcha
  recaptcha.validateRequest(req)
  .then(function()
  {
    // validated and secure
    req.flash("success", "Message sent");
    res.redirect('/');
  })
  .catch(function(errorCodes)
  {
    // Make a contact object to send back to the contact page
    var contact = {title: middleware.sanitize(req.body.title), content: middleware.sanitize(req.body.content) }
    // invalid
    req.flash("error", "Captcha not verified successfully");// translate error codes to human readable text
    res.render('contact/index', {contact: contact});
  });
});


module.exports = router;