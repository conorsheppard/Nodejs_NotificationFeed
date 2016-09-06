// Dependencies
var mongoose = require('mongoose');

// Schema
var notificationSchema = new mongoose.Schema({
    user_id: Number,
    timestamp: Number,
    message: String,
    read: Boolean
}, {
    versionKey: false // versioning disable to coincide with coding test data structure spec
});

// Return model to be accessed from outside
Notification = module.exports = mongoose.model('Notification', notificationSchema);

// Get notifications
module.exports.getNotifications = function(callback, id) {
    Notification.find({ user_id: id }, callback);
}

module.exports.newNotification = function(notification, callback) {
    var timestamp = Math.floor(new Date() / 1000);
    notification.timestamp = timestamp;
    Notification.create(notification, callback);
}

module.exports.updateNotification = function(id, notification, options, callback) {
    var query = {_id: id};
    var update = {
        timestamp: Math.floor(new Date() / 1000),
        message: notification.message,
        read: false
    }
    Notification.findOneAndUpdate(query, update, options, callback);
}

// Read a notification - set "read" to true.
module.exports.readNotification = function(id, notification, options, callback) {
    var query = {_id: id};
    var update = { read: true }
    Notification.findOneAndUpdate(query, update, options, callback);
}