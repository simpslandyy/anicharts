var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./controllers/index');
var users = require('./controllers/users');
var browse = require('./controllers/browse');
var shows = require('./controllers/show');
var search = require('./controllers/search');

var app = express();

// -- Set up views --//

// In the ejs library there is a function called _express,
// that registers .html as it would .ejs
// That way we don't have to name each view with .ejs
app.engine('.html', require('ejs').__express);

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Sets views to all the files under the views directory
// Apparently this is optional cause the views directory is CWD
// But keeping this here just in case
app.set('views', path.join(__dirname, 'views'));



// --- Some BS --- //
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// --- Routers --- //

// These are the routes that will be used in the application
app.use('/', routes);
app.use('/users', users);
app.use('/listings', browse);
app.use('/shows', shows);
app.use('/search', search);


// --- Middleware to catch and handle errors --- //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err); // passes 'err' to the next middleware, in this case one of the ones below
});

// error handlers

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      // will print stacktrace
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    // no stacktraces leaked to user
    error: {}
  });
});


module.exports = app;
