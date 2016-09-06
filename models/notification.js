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
    console.log('in getNotifications: id = ' + id);
    Notification.find({ user_id: id }, callback);
}

module.exports.newNotification = function(notification, callback) {
    var timestamp = Math.floor(new Date() / 1000);
    console.log('time = ' + timestamp);
    notification.timestamp = timestamp;
    Notification.create(notification, callback);
}

module.exports.updateNotification = function(id, notification, options, callback) {
    console.log('in updateNotification: '+ notification.user_id);
    var query = {_id: id};
    var update = {
        timestamp: Math.floor(new Date() / 1000),
        message: notification.message,
        read: false
    }
    Notification.findOneAndUpdate(query, update, options, callback);
}