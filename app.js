var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport = require("passport"),
    flash    =    require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User = require("./models/user"),
    seedDB     = require("./seed");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

//mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://gulshan:gulshan123@ds229701.mlab.com:29701/gulshan_yelpcamp");



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//passport configuration
app.use(require("express-session")({
  secret: "once again rusty wins the cutest dog!" ,
  resave: false ,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})


app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);


//  app.listen("3000",function(){
//  console.log("server has started");
//   });

 if (app.get('env') === 'development') {
     app.use(function(err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
             message: err.message,
             error: err
         });
     });
 }

// production error handler
 // no stacktraces leaked to user
 app.use(function(err, req, res, next) {
     res.status(err.status || 500);
     res.render('error', {
         message: err.message,
         error: {}
     });
 });

 app.listen(process.env.PORT || 3000, function(){
     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
 });
