# Spaceship Travel System

This project is a Spaceship Travel System application built using Node.js, Express, and React. It provides functionalities to manage spaceships, crew members, and missions. The application uses JWT for authentication and supports CORS for cross-origin requests.
![Diagram](https://github.com/TRoYHD/TipCode-assignment-TravelSpaceShip/blob/main/spaceship-travel-system/spaceship-travel-frontend/public/Comopent%20Struc.png)
![Diagram](https://github.com/TRoYHD/TipCode-assignment-TravelSpaceShip/blob/main/spaceship-travel-system/spaceship-travel-frontend/public/DataBase%20Design.png)
![Diagram](https://github.com/TRoYHD/TipCode-assignment-TravelSpaceShip/blob/main/spaceship-travel-system/spaceship-travel-frontend/public/spaceship%20approximate%20look.png)

## Installation

1. **Clone the repository:**

```bash
git clone <repository_url>
```

## Environment Variables
Create a `.env` file in the root of your project and add the following environment variables: ( I have included the env file in this repo so you can skip this if you want , there is 2 env one for backend and one for front-end)

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=spaceship_travel_system
SECRET_KEY=TopSecretKey
JWT_SECRET=TopTopSecretKey
```
<!-- ///////////// -->
2. **Navigate to the project directory:**

```bash
cd spaceship-travel-system
```
3. **Install dependencies for both backend and frontend:**

```bash
# Backend
cd spaceship-travel-backend
npm install

# Frontend
cd spaceship-travel-frontend
npm install
```

## Running the Application

1. **Start the backend server:**

```bash
cd spaceship-travel-system
cd spaceship-travel-backend
node src/app.js   TO RUN The Server which should Be Running in port 3000
```

2. **Start the frontend development server:**

```bash
cd spaceship-travel-system
cd spaceship-travel-frontend
npm start
Press Yes to run on port 3001 (note after opening the FrontEnd page you might need to refresh just to apply the generate token so you can access the protected routes )
```

The backend server will run on http://localhost:3000 and the frontend on http://localhost:3001.

## Generating JWT Tokens

To generate a JWT token and include it in the headers for subsequent requests, you can use the following script: ( this is not need it unless you want to try it on your own , it will generate on its own and place it in the headers)

```bash
TOKEN=$(curl -X POST http://localhost:3000/generate-token -H "Content-Type: application/json" -d '{}' | jq -r '.token')
```

Now you can use this token in the Authorization header for protected routes:

## Testing in PostsMan

### I have included a doumentation for postman (https://documenter.getpostman.com/view/27333474/2sA3XSALpk#9c9bc1c2-f0a0-4091-9a23-725ea4e979ca)
### Remember to get the token from the broswer local stroage and paste in postman so you can acceses the api before doing any operation

for Testing purpose in postman you need the token , you can get the token when you open the front-end page (you might need to refresh the page before doing that) of the app and press right click with mouse and inspect and then go to application storage to local storage and you will find there the Token that is need it for testing in the postman , note open postman  go to Authorization and choose the type to be Bearer Token then place the token After that you can use the protected routes and use it as much as you want.
```bash
curl -H "Authorization: Bearer $TOKEN" <your_protected_route>
```

![Diagram](https://github.com/TRoYHD/TipCode-assignment-TravelSpaceShip/blob/main/spaceship-travel-system/spaceship-travel-frontend/public/api.png)


## API Endpoints

### Spaceships
- `GET /spaceships`: Retrieve all spaceships
- `GET /spaceships/<id>`: Retrieve a spaceship by ID
- `POST /spaceships`: Create a new spaceship
- `PUT /spaceships/<id>`: Update a spaceship by ID
- `PATCH /spaceships/<id>`: Partially update a spaceship by ID
- `DELETE /spaceships/<id>`: Delete a spaceship by ID

### Crew Members
- `GET /crewmembers`: Retrieve all crew members
- `GET /crewmembers/<id>`: Retrieve a crew member by ID
- `POST /crewmembers`: Create a new crew member
- `PUT /crewmembers/<id>`: Update a crew member by ID
- `PATCH /crewmembers/<id>`: Partially update a crew member by ID
- `DELETE /crewmembers/<id>`: Delete a crew member by ID

### Missions
- `GET /missions`: Retrieve all missions
- `GET /missions/<id>`: Retrieve a mission by ID
- `POST /missions`: Create a new mission
- `PUT /missions/<id>`: Update a mission by ID
- `PATCH /missions/<id>`: Partially update a mission by ID
- `DELETE /missions/<id>`: Delete a mission by ID


##  How To Test API Endpoints using Postman

### Spaceships

- `GET /spaceships`: Retrieve all spaceships

`Set Authorization:`
`Open Postman.`
`Create a new request`
`Go to the "Authorization" tab`
`Select "Bearer Token" from the Type dropdown`
`Paste the JWT token you obtained earlier into the Token field`

`Test Endpoints`

GET /spaceships: Retrieve all spaceships
Method: GET
URL: http://localhost:3000/spaceships
Send request.

GET /spaceships/<id>: Retrieve a spaceship by ID
Method: GET
URL: http://localhost:3000/spaceships/{id}
Replace {id} with the actual spaceship ID.
Send request.

POST /spaceships: Create a new spaceship

Method: POST
URL: http://localhost:3000/spaceships
Body: raw JSON
Example:
json
Copy code
{
  "name": "Spaceship Name",
  "model": "Spaceship Model",
  "capacity": 100
}
Send request.

PUT /spaceships/<id>: Update a spaceship by ID
Method: PUT
URL: http://localhost:3000/spaceships/{id}
Replace {id} with the actual spaceship ID.
Body: raw JSON
Example:
json
Copy code
{
  "name": "Updated Spaceship Name",
  "model": "Updated Spaceship Model",
  "capacity": 150
}
Send request.

PATCH /spaceships/<id>: Partially update a spaceship by ID
Method: PATCH
URL: http://localhost:3000/spaceships/{id}
Replace {id} with the actual spaceship ID.
Body: raw JSON
Example:
json
Copy code
{
  "capacity": 200
}
Send request.

DELETE /spaceships/<id>: Delete a spaceship by ID
Method: DELETE
URL: http://localhost:3000/spaceships/{id}
Replace {id} with the actual spaceship ID.
Send request.


## Difference between PUT and Patch
`PUT Request Example`
For PUT, you must include all the required fields. Here’s how you can do it in Postman:

`Full Update: The PUT method is used to update an entire resource. When you send a PUT request, you generally provide a complete representation of the resource,The resource at the target URL is replaced with the data provided in the request body. If any fields are omitted, they are typically set to default values or removed.`


Open Postman.
Create a new request.
Set the request type to PUT.
Set the URL to http://localhost:3000/spaceships/3.
Add Headers:
Key: Content-Type, Value: application/json
Set the Body to raw JSON:
json
Copy code
{
    "name": "Discovery",
    "capacity": 82,
    "launchDate": "2024-03-09T22:00:00.000Z",
    "status": "Under Maintenance"                 // you can choose * Ready ,Under Maintenance , In mission *  those are the only can added otherwise it will gives error back
}
Click Send.


`PATCH Request Example`
For PATCH, you only need to include the fields you want to update. Here’s how you can do it in Postman:


`The PATCH method is used for partial updates. When you send a PATCH request, you only provide the fields that you want to update. The fields that are not specified in the request remain unchanged.`

Open Postman.
Create a new request.
Set the request type to PATCH.
Set the URL to http://localhost:3000/spaceships/3.
Add Headers:
Key: Content-Type, Value: application/json
Set the Body to raw JSON:
json
Copy code
{
    "Status": "Under Maintenance"
}
Click Send.

## BackEnd Usage

## Session Management
Session management is implemented using `express-session`and protected Routes using JWT.
Purpose:
express-session is a middleware for managing user sessions in a web application. It allows you to store data on the server and associate it with a unique session ID for each user. This is useful for keeping track of user in

To run the session data routes and understand what you get from them, you need to follow these steps:
1. Start Your Server
Ensure your server is running. From your project directory, you can start your server by running:
sh
Copy code
node app.js

2. Set Session Data
You can set session data using a POST request to /set-session-data. This data will be stored in the session and can be retrieved later.

Example Request to Set Session Data:
Using curl:
sh
Copy code
curl -X POST http://localhost:3000/set-session-data -H "Content-Type: application/json" -d '{"key": "value"}'
Using Postman:

Open Postman.
Set the request type to POST.
Enter the URL http://localhost:3000/set-session-data.
Go to the Body tab.
Select raw and choose JSON from the dropdown.
Enter the JSON data you want to store in the session:
json
Copy code
{
  "key": "value"
}
Click Send.
3. Get Session Data
You can retrieve the stored session data using a GET request to /get-session-data.

Example Request to Get Session Data:
Using curl:

sh
Copy code
curl http://localhost:3000/get-session-data
Using Postman:

Open Postman.
Set the request type to GET.
Enter the URL http://localhost:3000/get-session-data.
Click Send.
4. Understanding the Output
Setting Session Data:
When you set session data, you should receive a response indicating that the session data has been set:

json
Copy code
{
  "message": "Session data set"
}
Getting Session Data:
When you retrieve session data, you will receive the data that was stored in the session:

json
Copy code
{
  "key": "value"
}
Example Scenario:
Set Session Data:

sh
Copy code
curl -X POST http://localhost:3000/set-session-data -H "Content-Type: application/json" -d '{"user": "john", "role": "admin"}'
Response:

json
Copy code
{
  "message": "Session data set"
}
Get Session Data:

sh
Copy code
curl http://localhost:3000/get-session-data
Response:

json
Copy code
{
  "user": "john",
  "role": "admin"
}
Using Session Data
You can use session data to store any kind of information that you want to persist across multiple requests from the same client. This can be useful for storing user preferences, temporary data that should not be saved in a database, or any other information you need to maintain state across requests.
For example, you can store temporary settings, preferences, or data that need to be accessible across different parts of your application without involving a database.
Key Points
Sessions: Store temporary data across requests. Each user has a unique session.
Session Data: Can be any JSON object.
Retrieving Session Data: Provides the stored data for the session associated with the request




## Input Validation and Error Handling
Input validation is done using `Joi`, and error handling is implemented in the controllers.

## Rate Limiting
Rate limiting is implemented using `express-rate-limit` to prevent spamming and network issues. Each IP is limited to 100 requests per 15 minutes.


## Frontend Usage

The frontend application is built using React and Material-UI. It includes components for listing, creating, updating, and deleting spaceships, crew members, and missions. The application is responsive and supports mobile views.


 ## Technologies
React
Axios
React Router
React Data Table Component
Material-UI
Styled Components
React Hook Form
Yup
Day.js
Testing Library (React Testing Library, Jest DOM)
