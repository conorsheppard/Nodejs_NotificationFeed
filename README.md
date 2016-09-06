##Notification Feed Exercise built with Node.js

**Spec:**

HTTP service that has two endpoints: POST /notifications which accepts the following Notification data structure in JSON:

		{"user_id": int, "timestamp": int, "message": String}

and returns the following:

		{"id": int, "user_id": int, "timestamp": int, "message": String}

GET /notifications/by_user/<user_id> which returns a JSON list of the last N Notifications in time (priority) order descending

**Dependencies**

This application uses the Node.js framework, the Express framework and MongoDB as the Database.


**GET:** When ran, this application runs on port 3000. Go to http://localhost:3000/notifications/by_user/id to view the notifications for a given user (id is a user id). 
The notifications will be displayed in time order descending based on the UNIX timestamp field.

Returning all notification for user with user_id 100. Notice how all but the most recent notifications have read set to true
![GET Request 1 Screenshot](/screenshots/GET%20before%20refresh.png?raw=true)

After a refresh i.e. after the notification has been read, the most recent notification has read set to true also.
![GET Request 2 Screenshot](/screenshots/Get%20after%20refresh.png?raw=true)

**POST:** The application accepts POST requests at the following address http://localhost:3000/notifications where new notifications can be stored in the database.
The data should come in as a JSON data structure as outlined in the spec, with an added read field which holds a boolean value to record whether the notification has been read or not.

Using the Chrome extension Postman to send a post request to the application.
![POST Request Screenshot](/screenshots/POST%20Request.png?raw=true)

The request is a success and returns the following.
![POST Response Screenshot](/screenshots/POST%20Return.png?raw=true)

**PUT:** As an extra feature, the application accepts PUT requests at the following address http://localhost:3000/notifications/update which takes in a JSON array with 3 fields: 
	"_id" - the id of the notification, 
	"user_id" - id of the user,
	"message" - the message to be updated.
The read field is then automatically reset to false.

Updating a message with a PUT request.
![PUT Request Screenshot](/screenshots/PUT%20request.png?raw=true)

The request is a success and we can see the updated message in the user's notification feed.
![GET Request after PUT Screenshot](/screenshots/Updated%20notification.png?raw=true)

###Testing Speed/Scalability

I have also included a Java file which I used to perform speed and scalability tests on this application. I also conducted concurrency testing and ran multiple threads to perform GET requests on the system and see how it handled them.

**Test 1:** 10,000 get requests for 1 user = 18475359000ns = 18.48s
	-> ~540 requests/sec

**Test 2:** 10,000 get requests for 1 user = 17012480000ns = 17.01s
	-> ~588 requests/sec

**Test 3:** 10,000 get requests for 1 user = 16798394000ns = 16.80s
	-> ~595 requests/sec

As for concurrency, when I jacked up the amount of threads running, the application seemed to be able to handle it without trouble. The largest number of threads I tested on it was 100 threads doing 100 requests each.