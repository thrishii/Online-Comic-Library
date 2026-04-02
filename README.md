Online Comic Library

Table of Contents

1.Project Overview
2.Objectives
3.User Roles
4.System Architecture
5.Technologies Used
6.Features
7.Folder Structure
8.Installation & Setup
9.Environment Variables
10.Running the Application
11.API Endpoints
12.Authentication & Security
13.Automated Testing
14.User Interface Pages
15.Role-Based Behaviour
16.Deployment Plan
17.Screenshots (Report Requirement)
18.Future Enhancements
19.Author
20.Conclusion


1. Project Overview

The Online Comic Library is a full-stack web application developed to allow users to browse, search, view, and manage a collection of comics. The system supports secure authentication, role-based access control, and CRUD operations.

This project extends the IFQ636 starter application into a complete system using React, Node.js, Express, and MongoDB. It demonstrates real-world application development including authentication, API design, testing, and deployment preparation.

2. Objectives
Develop a complete full-stack application
Implement secure authentication using JWT
Apply role-based access control (Admin / Customer)
Provide CRUD functionality for comics
Build a responsive and user-friendly interface
Implement automated backend testing
Prepare the application for CI/CD and deployment

3. User Roles
Customer
Register and login
Browse comics
Search comics
View comic details
Update profile
Admin
All customer functionalities
Add comics
Edit comics
Delete comics

4. System Architecture

Frontend:

React.js
Axios for API communication
Tailwind CSS for styling

Backend:

Node.js
Express.js
RESTful API design
JWT authentication

Database:

MongoDB Atlas
Mongoose ODM
5. Technologies Used

Frontend: React, Tailwind CSS, Axios

Backend: Node.js, Express.js, JWT, bcrypt

Database: MongoDB

Testing: Mocha, Chai, Supertest

DevOps: GitHub, GitHub Actions, AWS EC2, PM2, Nginx

6. Features

Authentication

User registration
Secure login
JWT token authentication

Role-Based Access

Admin → Full access
Customer → Read-only access

Comic Management

Create, Read, Update, Delete (Admin only)

Browse & Search

View all comics
Search by title, author, genre

Comic Details

View full comic information

Dashboard

Navigation to features
Role-based display

Image Support

Image URL input
Preview before saving
Error handling
7. Folder Structure

sampleapp_IFQ636
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ ├── test
│ ├── server.js
│ └── package.json
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── context
│ │ ├── pages
│ │ └── App.js
│ └── package.json
│
└── README.md

8. Installation & Setup

All commands should be run in the terminal from the root project folder.

Step 1: Open project folder in VS Code

Step 2: Install backend dependencies
cd backend
npm install

Step 3: Install frontend dependencies
cd ../frontend
npm install

9. Environment Variables

Create a .env file inside backend folder:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
TEST_ADMIN_EMAIL=your_admin_email
TEST_ADMIN_PASSWORD=your_admin_password

10. Running the Application

Start Backend
cd backend
npm start

Start Frontend
cd frontend
npm start

Application URL
http://localhost:3000

11. API Endpoints

The backend follows RESTful API design.

Authentication Routes

POST /api/auth/register → Register user
POST /api/auth/login → Login user

Comic Routes

GET /api/comics → Get all comics
GET /api/comics/:id → Get comic details
POST /api/comics → Create comic (Admin only)
PUT /api/comics/:id → Update comic (Admin only)
DELETE /api/comics/:id → Delete comic (Admin only)

12. Authentication & Security
JWT authentication implemented
Password hashing using bcrypt
Protected routes using middleware
Role-based access control
Frontend hides admin features for customers
13. Automated Testing

Testing is implemented using:
Mocha, Chai, Supertest

Tested Scenarios

Unauthorized access
Invalid token
Admin login and token generation
Fetch comics
Create comic
Get comic details
Update comic
Delete comic

Run Tests
cd backend
npm test

14. User Interface Pages
Login
Register
Dashboard
Browse Comics
Comic Details
Manage Comics (Admin)
Profile

15. Role-Based Behaviour

Customer

Cannot access Manage Comics
Cannot add/edit/delete

Admin

Full access
Can manage comics

16. Deployment Plan
GitHub for version control
GitHub Actions for CI/CD
AWS EC2 (Ubuntu)
PM2 for process management
Nginx configuration
17. Screenshots (Report Requirement)

Include:

Login & Register
Dashboard
Browse page
Comic details
Admin panel
Testing results
GitHub repo
CI/CD workflow
Deployment

18. Future Enhancements
Ratings and reviews
Image upload
Pagination
Favourite comics
Admin analytics
19. Author

Thrishika Rajappaji

20. Conclusion

This project demonstrates a complete full-stack application with authentication, role-based access, CRUD operations, automated testing, and deployment readiness. It reflects modern software engineering practices and real-world application design.