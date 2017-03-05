var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    cookieParser    = require("cookie-parser"),
    sanitizeHtml    = require("sanitize-html"),
    methodOverride  = require('method-override'),
    session         = require("express-session"),
    flash           = require("connect-flash"),
    sass            = require("node-sass-middleware"),
    Blog            = require("./models/blog"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local");
    

//requiring routes
var indexRoutes   = require('./routes/index');
var blogRoutes    = require('./routes/blogs');
var imageUpload   = require('./routes/images');
var projectRoutes = require('./routes/projects');
var contactRoutes = require('./routes/contact');

// Connect to mongo using mongoose
var mongoConnect = process.env.PROD_MONGODB || "mongodb://localhost/jimmy_blog_app";
mongoose.connect(mongoConnect);

// Add/configure each of the above modules to the express app
app.set('view engine', 'ejs');  // Use EJS as the view engine
app.use(flash());               // Enable the flash module to be used by the app
// Configure body parser, so that we can get passed in parameters with req.body
app.use(bodyParser.urlencoded({extended: true, limit: "10mb", parameterLimit: 50000}));
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
app.use('/', indexRoutes);
app.use('/blogs', blogRoutes);
app.use('/images', imageUpload);
app.use('/projects', projectRoutes);
app.use('/contact', contactRoutes);

// Set port to env variable, or 3000 if on devel station
var port    = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip_addr = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// Start server
app.listen(port, ip_addr, function()
{
    console.log("Blog app started, running at: " + ip_addr + ":" + port);
});
