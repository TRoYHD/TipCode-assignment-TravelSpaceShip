# Documentation for Spaceship Travel System

---

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Generating JWT Token](#generating-jwt-token)
5. [API Endpoints](#api-endpoints)
6. [Frontend Usage](#frontend-usage)
7. [Validation](#validation)

---

## Introduction

The Spaceship Travel System is designed to manage spaceships, crew members, and missions. The application uses JWT for authentication and express-session for session management.

---

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>


   Install dependencies:
sh
Copy code
npm install
Running the Application
Start the backend server:

sh
Copy code
npm start
Open another terminal and navigate to the frontend directory:

sh
Copy code
cd frontend
npm start




API Endpoints
Spaceships
GET /spaceships - Retrieve all spaceships
GET /spaceships/:id - Retrieve a spaceship by ID
POST /spaceships - Create a new spaceship
PUT /spaceships/:id - Update a spaceship
PATCH /spaceships/:id - Partially update a spaceship
DELETE /spaceships/:id - Delete a spaceship
Crew Members
GET /crewmembers - Retrieve all crew members
GET /crewmembers/:id - Retrieve a crew member by ID
POST /crewmembers - Create a new crew member
PUT /crewmembers/:id - Update a crew member
PATCH /crewmembers/:id - Partially update a crew member
DELETE /crewmembers/:id - Delete a crew member
Missions
GET /missions - Retrieve all missions
GET /missions/:id - Retrieve a mission by ID
POST /missions - Create a new mission
PUT /missions/:id - Update a mission
PATCH /missions/:id - Partially update a mission
DELETE /missions/:id - Delete a mission