# 🎓 Student Management System (Full-Stack CRUD)

A modern, full-stack web application designed to manage student records efficiently. This project features a React frontend, a Node.js/Express backend, and a MySQL database.



## 🚀 Features

* **Full CRUD Functionality:** Create, Read, Update, and Delete student records.
* **Real-time Search:** Filter students by Name or Roll Number instantly as you type.
* **PDF Export:** Generate and download professional PDF reports of the student list using `jsPDF`.
* **Data Validation:** Comprehensive frontend and backend validation (Email formats, numeric Roll Nos, etc.).
* **Environment Security:** Sensitive database credentials managed via `.env` files.
* **Responsive UI:** Clean and organized interface with real-time UI updates.

## 🛠️ Tech Stack

**Frontend:**
* React.js
* Axios (API Calls)
* jsPDF & jsPDF-AutoTable (PDF Generation)

**Backend:**
* Node.js & Express
* MySQL (Database)
* Dotenv (Environment Variables)
* CORS

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
* [Node.js](https://nodejs.org/)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)

---

## ⚙️ Setup Instructions

### 1. Database Setup
Create a database named `school_db` and run the following SQL query:

```sql
CREATE TABLE students (
    roll_no VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);


2. Backend ConfigurationNavigate to the backend folder.Install dependencies: npm install.Create a .env file and add your credentials:Code snippetDB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
PORT=5000
Start the server: node server.js.3. Frontend ConfigurationNavigate to the frontend folder.Install dependencies: npm install.Start the application: npm start (or npm run dev).📷 ScreenshotsDashboard & SearchPDF Report GenerationInsert Screenshot of your UI hereInsert Screenshot of your PDF here🤝 ContributingFeel free to fork this repository and submit pull requests for any features or bug fixes.📄 LicenseThis project is open-source and available under the MIT License.
---
