# Spaceship Travel System API

This API provides CRUD operations for managing a spaceship travel system to Moon, Mars, and Jupiter.

## Endpoints

### Spaceships
- `GET /spaceships` - Retrieve a list of all spaceships.
- `POST /spaceships` - Add a new spaceship.
- `GET /spaceships/:id` - Retrieve a single spaceship by ID.
- `PUT /spaceships/:id` - Update a spaceship's information.
- `PATCH /spaceships/:id` - Partially update a spaceship's information.
- `DELETE /spaceships/:id` - Delete a spaceship.

### CrewMembers
- `GET /crewmembers` - Retrieve a list of all crew members.
- `POST /crewmembers` - Add a new crew member.
- `GET /crewmembers/:id` - Retrieve a single crew member by ID.
- `PUT /crewmembers/:id` - Update a crew member's information.
- `PATCH /crewmembers/:id` - Partially update a crew member's information.
- `DELETE /crewmembers/:id` - Delete a crew member.

### Missions
- `GET /missions` - Retrieve a list of all missions.
- `POST /missions` - Add a new mission.
- `GET /missions/:id` - Retrieve a single mission by ID.
- `PUT /missions/:id` - Update a mission.
- `PATCH /missions/:id` - Partially update a mission.
- `DELETE /missions/:id` - Delete a mission.

## Session Management
Session management is implemented using `express-session`.

## Input Validation and Error Handling
Input validation is done using `Joi`, and error handling is implemented in the controllers.

## Rate Limiting
Rate limiting is implemented using `express-rate-limit` to prevent spamming and network issues. Each IP is limited to 100 requests per 15 minutes.

## Environment Variables
Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=spaceship_travel_system

PUT Request Example
For PUT, you must include all the required fields. Here’s how you can do it in Postman:

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
    "SpaceshipID": 3,
    "Name": "Discovery",
    "Capacity": 82,
    "LaunchDate": "2024-03-09T22:00:00.000Z",
    "Status": "Under Maintenance"
}
Click Send.
PATCH Request Example
For PATCH, you only need to include the fields you want to update. Here’s how you can do it in Postman:

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