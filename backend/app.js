var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const Joi = require('@hapi/joi')
const jwt = require('express-jwt')
const config = require('./config')

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

/* Login API */



app.use('/api', jwt({
    secret: config.webtokenkey,
    algorithms: ['HS256']
}).unless({
    path: ['/api/login', '/api/register', '/api/classlist']
}));
app.use('/api/myProfile', require('./routes/myProfile'))
app.use('/api/classlist', require('./routes/classlist'))
app.use('/api', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, "../frontend/egglenderlogin", "build")));
// app.use(express.static("public"));

app.use('/api', (err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        res.send({
            status: 1,
            msg: [err.details[0].context.label, err.details[0].message]
        })
    }
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 1,
            msg: 'TOKEN has some error'
        });
    }
    res.send({
        status: 1,
        msg: err.message || err
    })
})



/* Stock */

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "../frontend/egglenderlogin", "build", "index.html")))
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'))
app.use('/api/setting', require('./routes/setting'))
app.use('/api/settingupdate', require('./routes/settingUpdate'))
app.use('/api/friendlist', require('./routes/friends'));
app.use('/api/getschedule', require('./routes/getSchedule'));
app.use('/api/setschedule', require('./routes/setSchedule'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //   res.render('error');
});

module.exports = app;