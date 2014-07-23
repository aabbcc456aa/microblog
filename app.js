
/**
 * Module dependencies.
 */

var express = require('express');
var settings = require('./settings');
var MongoStore = require('connect-mongo')(express);
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');


var app = express();

// all environments
app.configure(function() {
    app.set('port', process.env.PORT || 4000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.set('layout', 'layout');
    app.use(expressLayouts);
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: settings.cookieSecret,
        store: new MongoStore({
            db: settings.db
        })
    }));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    //app.use(express.router(routes));
    app.use(express.static(path.join(__dirname, 'public')));
});

routes(app);



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/u/:user', routes.user);
//app.post('/post', routes.post);
//app.get('/reg', routes.reg);
//app.post('/post',routes.doReg);
//app.get('/login',routes.login);
//app.post('/login', routes.doLogin);
//app.get('/logout',routes.logout);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
