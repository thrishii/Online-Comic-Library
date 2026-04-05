# Online Comic Library

A full-stack web application that allows users to browse, create, update, and delete comics. This project demonstrates CRUD operations, authentication, CI/CD pipeline setup, and cloud deployment.

---

## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Installation & Setup
- API Endpoints
- Testing
- CI/CD Pipeline
- Deployment
- Screenshots
- Gen-AI Usage
- Learnings
- Conclusion
- Author

---

## Live Application
http://3.25.59.150

---

## Overview

This project is a full-stack application built using React, Node.js, and MongoDB. It allows users to manage comic records while implementing authentication, authorization, and DevOps practices.

---

## Features

### Authentication & Authorization
- User registration and login using JWT
- Secure protected routes
- Role-based access (Admin only for CRUD operations)

### Comic Management
- Create comics
- View comics
- Update comics
- Delete comics

### DevOps
- CI/CD pipeline using GitHub Actions
- Automated testing
- AWS EC2 deployment

---

## Tech Stack

**Frontend**
- React.js
- Axios

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas

**DevOps**
- GitHub Actions
- AWS EC2
- PM2
- Nginx

---

## Project Structure

```
Online-Comic-Library/
├── backend/
├── frontend/
└── .github/workflows/ci.yml
```

---

## Installation & Setup

### Clone Repository
```
git clone https://github.com/<your-username>/Online-Comic-Library.git
cd Online-Comic-Library
```

### Backend Setup
```
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
PORT=5001
TEST_ADMIN_EMAIL=admin@admin.com
TEST_ADMIN_PASSWORD=123456
```

Run backend:
```
npm run dev
```

### Frontend Setup
```
cd frontend
npm install
npm start
```

---

## API Endpoints

**Auth**
- POST /api/auth/register
- POST /api/auth/login

**Comics**
- GET /api/comics
- POST /api/comics (Admin)
- PUT /api/comics/:id (Admin)
- DELETE /api/comics/:id (Admin)

---

## Testing

- Mocha
- Chai
- Sinon

Run:
```
npm test
```

All tests passed successfully.

---

## CI/CD Pipeline

- Implemented using GitHub Actions
- Workflow file: `.github/workflows/ci.yml`
- Runs on every push

---

## Deployment

- AWS EC2 (Ubuntu)
- PM2 process manager
- Nginx reverse proxy

Access:
```
http://<your-ec2-public-ip>
```

---

## Screenshots

- CRUD Operations
<img width="1920" height="1080" alt="Screenshot (1152)" src="https://github.com/user-attachments/assets/5535e468-1f0e-487f-8ae1-2d1fad52dcc6" />
<img width="1920" height="1080" alt="Screenshot (1150)" src="https://github.com/user-attachments/assets/459110cf-c014-42c3-a5c9-6ccbc7198344" />

<img width="1920" height="1080" alt="Screenshot (1158)" src="https://github.com/user-attachments/assets/ae6083d3-4960-48d1-82da-3290a58317e9" />
<img width="1920" height="1080" alt="Screenshot (1155)" src="https://github.com/user-attachments/assets/acac196d-d9a7-4790-a1ff-9bb734e69875" />
<img width="1920" height="1080" alt="Screenshot (1153)" src="https://github.com/user-attachments/assets/7a364c4a-5f24-47dd-9333-c4b5037b4f74" />

- GitHub Actions
  
<img width="1920" height="1080" alt="Screenshot (1066)" src="https://github.com/user-attachments/assets/c4f7836a-b528-4327-996c-5e86ac3567fb" />

- Deployment
<img width="1920" height="1080" alt="Screenshot (1140)" src="https://github.com/user-attachments/assets/8e014689-860a-49a7-aca9-66631032090f" />
<img width="1920" height="1080" alt="Screenshot (1139)" src="https://github.com/user-attachments/assets/673ecefd-173d-4170-b6bd-7a98a6a9f04a" />
<img width="1920" height="1080" alt="Screenshot (1138)" src="https://github.com/user-attachments/assets/35698ab7-f730-480d-a630-6f09f2ebd8f6" />
<img width="1920" height="1080" alt="Screenshot (1137)" src="https://github.com/user-attachments/assets/246fa4fa-72d8-4c3b-ad81-2e0ae8c1c3e7" />
<img width="1920" height="1080" alt="Screenshot (1136)" src="https://github.com/user-attachments/assets/4b88c264-96a7-4dc8-97a1-3c3160c7b37a" />
<img width="1920" height="1080" alt="Screenshot (1135)" src="https://github.com/user-attachments/assets/93eb73e3-6af0-4131-8955-6982c7085110" />
<img width="1920" height="1080" alt="Screenshot (1134)" src="https://github.com/user-attachments/assets/fd4db947-2d2a-40ed-914e-d0d8749ef000" />
<img width="1920" height="1080" alt="Screenshot (1133)" src="https://github.com/user-attachments/assets/f748b1ef-1a92-42c4-9b2c-0b0395bed02a" />
<img width="1920" height="1080" alt="Screenshot (1132)" src="https://github.com/user-attachments/assets/c9de87ed-3819-4f3f-841c-dc8028800d5b" />
<img width="1920" height="1080" alt="Screenshot (1131)" src="https://github.com/user-attachments/assets/311de242-2eac-4ebe-a304-f5220113b2b6" />
<img width="1920" height="1080" alt="Screenshot (1066)" src="https://github.com/user-attachments/assets/09fff6ad-e52c-4ea4-9394-5e271d0a8454" />
<img width="1920" height="1080" alt="Screenshot (1147)" src="https://github.com/user-attachments/assets/d238d05e-a33b-4565-9ecf-76c66b40c554" />
<img width="1920" height="1080" alt="Screenshot (1146)" src="https://github.com/user-attachments/assets/a23bf9fb-2c1a-4b17-ace7-8c0aaec43a1f" />
<img width="1920" height="1080" alt="Screenshot (1145)" src="https://github.com/user-attachments/assets/854a67f6-7971-4065-a4a0-9d66e35fd1bb" />
<img width="1920" height="1080" alt="Screenshot (1144)" src="https://github.com/user-attachments/assets/6ca7fe90-9ea2-4746-869f-2dcf9aaa3468" />
<img width="1920" height="1080" alt="Screenshot (1143)" src="https://github.com/user-attachments/assets/1e0047eb-84a8-4e49-8a57-4d785382bfb1" />
<img width="1920" height="1080" alt="Screenshot (1142)" src="https://github.com/user-attachments/assets/00b19e27-6ee2-430f-ad46-d6b4104e5c2b" />
<img width="1920" height="1080" alt="Screenshot (1141)" src="https://github.com/user-attachments/assets/fd2ab955-021c-4e69-bd7c-8afadc42fabb" />

---

## Learnings

- Full-stack development
- Authentication & APIs
- CI/CD pipelines
- Cloud deployment

---

## Conclusion

This project demonstrates a complete full-stack CRUD application integrated with DevOps practices.

---

## 👩‍💻 Author

Thrishika Rajappaji
