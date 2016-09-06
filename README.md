"spell_check": true
##Notification Feed Exercise built with Node.js

**Spec:**

HTTP service that has two endpoints: POST /notifications which accepts the following Notification data structure in JSON:

		{"user_id": int, "timestamp": int, "message": String}

and returns the following:

		{"id": int, "user_id": int, "timestamp": int, "message": String}

GET /notifications/by_user/<user_id> which returns a JSON list of the last N Notifications in time (priority) order descending

**GET:** When ran, this application runs on port 3000. Go to http://localhost:3000/notifications/by_user/id to view the notifications for a given user (id is a user id). 
The notifications will be displayed in time order descending based on the UNIX timestamp field.

**POST:** The application accepts POST requests at the following address http://localhost:3000/notifications where new notifications can be stored in the database.
The data should come in as a JSON data structure as outlined in the spec, with an added read field which holds a boolean value to record whether the notification has been read or not.

**PUT:** As an extra feature, the application accepts PUT requests at the following address http://localhost:3000/notifications/update which takes in a JSON array with 3 fields: 
	"_id" - the id of the notification, 
	"user_id" - id of the user,
	"message" - the message to be updated.
The read field is then automatically reset to false.


**Testing Speed/Scalability**

I have also included a Java file which I used to perform speed and scalability tests on this application. I also conducted concurrency testing and ran multiple threads to perform GET requests on the system and see how it handled them.

