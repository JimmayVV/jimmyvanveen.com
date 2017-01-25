var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    cookieParser          = require("cookie-parser"),
    expressSanitizer      = require("express-sanitizer"),
    methodOverride        = require('method-override'),
    session               = require("express-session"),
    flash                 = require("connect-flash"),
    sass                  = require("node-sass-middleware"),
    Blog                  = require("./models/blog"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local");
    

//requiring routes
//var commentRoutes    = require("./routes/comments");
//var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var blogRoutes  = require("./routes/blogs");

// Connect to mongo using mongoose
mongoose.connect("mongodb://localhost/jimmy_blog_app");

// Add/configure each of the above modules to the express app
app.set('view engine', 'ejs');  // Don't need to provide 'ejs' extensions to those files
app.use(flash());               // Enable the flash module to be used by the app
app.use(expressSanitizer());    // Sanitize the input from HTML forms, so no scripts can be injected
// Configure body parser, so that we can get passed in parameters with req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Configure sass files to compile into the public folder
app.use('/stylesheets', sass(
{
  src:    __dirname + '/sass', 
  dest:   __dirname + '/public/stylesheets',
  debug:  true,       
})); 
// Configure the "public" folder to contain static files such as CSS & JS (or images)
app.use(express.static(__dirname + "/public"));
// Reads the '_method' GET parameter to determine if a HTTP request should be interpretted as something else (ie, PUT)
app.use(methodOverride('_method'));
// Set up cookieParser
app.use(cookieParser('secret'));

// Session middleware, so that we can keep track of logged in users
app.use(require("express-session")(
{
  secret: "Charlie and Tucker are the best dogs",
  resave: false,
  saveUninitialized: false
}));

// Configure passport
app.use(passport.initialize());
app.use(passport.session());

// Configure the users within passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom middleware
app.use(function(req, res, next)
{
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


//============
// ROUTES
//============
app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);


// Start server
app.listen(3000, function(){
    console.log("Blog app started");
})