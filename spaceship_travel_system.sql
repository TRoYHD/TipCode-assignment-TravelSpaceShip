-- Create the database
CREATE DATABASE Spaceship_Travel_System;

-- Use the database
USE Spaceship_Travel_System;

-- Create the Spaceships table
CREATE TABLE Spaceships (
    SpaceshipID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Capacity INT NOT NULL,
    LaunchDate DATE NOT NULL,
    Status ENUM('Ready', 'In Mission', 'Under Maintenance') NOT NULL
);

-- Create the CrewMembers table
CREATE TABLE CrewMembers (
    CrewMemberID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    ExperienceLevel ENUM('Beginner', 'Intermediate', 'Expert') NOT NULL,
    AssignedSpaceshipID INT NULL,
    FOREIGN KEY (AssignedSpaceshipID) REFERENCES Spaceships(SpaceshipID)
);

-- Create the Missions table
CREATE TABLE Missions (
    MissionID INT PRIMARY KEY AUTO_INCREMENT,
    SpaceshipID INT NOT NULL,
    Destination ENUM('Moon', 'Mars', 'Jupiter') NOT NULL,
    LaunchDate DATE NOT NULL,
    Duration INT NOT NULL,
    FOREIGN KEY (SpaceshipID) REFERENCES Spaceships(SpaceshipID)
);

-- Insert some sample data into Spaceships
INSERT INTO Spaceships (Name, Capacity, LaunchDate, Status) VALUES
('Apollo', 5, '2024-01-01', 'Ready'),
('Enterprise', 10, '2024-02-15', 'In Mission'),
('Discovery', 8, '2024-03-10', 'Under Maintenance');

-- Insert some sample data into CrewMembers
INSERT INTO CrewMembers (Name, Role, ExperienceLevel, AssignedSpaceshipID) VALUES
('John Doe', 'Captain', 'Expert', 1),
('Jane Smith', 'Engineer', 'Intermediate', 1),
('Bob Johnson', 'Scientist', 'Beginner', NULL);

-- Insert some sample data into Missions
INSERT INTO Missions (SpaceshipID, Destination, LaunchDate, Duration) VALUES
(1, 'Moon', '2024-04-01', 30),
(2, 'Mars', '2024-05-01', 60);

-- Select data to verify the entries
SELECT * FROM Spaceships;
SELECT * FROM CrewMembers;
SELECT * FROM Missions;
