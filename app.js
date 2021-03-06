var express = require('express');
//var connect = require('connect');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(partials());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
	if (!req.path.match(/\/login|\/logout/)){
		req.session.redir = req.path;
	}
	
	res.locals.session = req.session;
	next();
});
app.use(function(req,res,next){
	console.log("monerkebab");
	if (req.session.user){
		if (res.locals.session.logouttime) console.log(res.locals.session.logouttime);		
		var now = new Date();
		if (res.locals.session.logouttime){
			var before = new Date(res.locals.session.logouttime);
			if ((now.getTime() - before.getTime()) > 1000){
			    if ((now.getTime() - before.getTime()) > 120000){
				console.log("Forzar logout");		
				res.redirect('/logout');
				res.locals.session.logouttime = null;
			    }
			}
		}else{
		    res.locals.session.logouttime = now;
		    console.log(res.locals.session.logouttime);		
		}
	}
	next();
});
app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
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


module.exports = app;
