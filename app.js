// Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Notification = require('./models/notification');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// MongoDB
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/notification_feed');
mongoose.connect('mongodb://localhost/notifications');
var db = mongoose.connection;

// Routes
app.get('/notifications/by_user/:id', function(req, res){
    var id = req.params.id;
    Notification.getNotifications(function(err, notifications){
        if(err) throw err;
        notifications.sort(sort_by('timestamp', true, parseInt)); // sort by timestamp descending
        res.send(JSON.stringify(notifications, null, 2));
        // markAsRead:
        for (var notification in notifications) {
            var curNotification = notifications[notification];
            if (!curNotification.read) {
                curNotification.read = true;
                Notification.readNotification(curNotification._id, curNotification, {}, function (err) {
                    if (err) throw err;
                });
            }
        }
    }, id);
});

app.post('/notifications', function (req, res) {
    var notification = req.body;
    Notification.newNotification(notification, function (err, writeResult) {
        if(err) throw err;
        res.json(writeResult);
    });
});

app.put('/notifications/update', function(req, res){
    var id = req.body._id;
    var notification = req.body;
    console.log('in put: ' + notification.user_id);
    Notification.updateNotification(id, notification, {}, function(err, notification){
        if(err) throw err;
        res.json(notification);
    });
});

// sort function
var sort_by = function(field, reverse, primer){
    var key = primer ?
        function(x) {return primer(x[field])} :
        function(x) {return x[field]};
    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

app.listen(3000);
console.log('Running on port 3000...');