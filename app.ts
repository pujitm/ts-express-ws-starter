import debug = require('debug');
import express = require('express');
import path = require('path');

import routes from './routes/index';
import users from './routes/user';
import streams from './routes/streams';

var app = express();
// Make sure to set up the express-ws module before loading or defining your routers!
// See https://www.npmjs.com/package/express-ws for documentation
var expressWs = require('express-ws')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

// Use Routers
app.use('/', routes);
app.use('/users', users);
app.use('/stream', streams);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// For non-node developers: https://stackoverflow.com/a/39245510/6656631
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
