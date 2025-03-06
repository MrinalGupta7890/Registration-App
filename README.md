User Registration and Authentication System

📌 Overview

This project is a User Registration and Authentication System built using React.js and Firebase. It allows users to register, login, and store user details securely. Password validation is enforced for security.

🛠️ Tech Stack

Frontend: React.js

Backend & Authentication: Firebase Authentication

Database: Firestore (NoSQL database)

UI Components: React Icons

✨ Features

✅ User Registration:

Collects first name, last name, email, contact, gender, date of birth, graduation year, and course.

Ensures strong password validation (uppercase, lowercase, number, special character, min 8 chars).

✅ Login Authentication:

Uses Firebase Authentication for secure login.

Redirects users upon successful login.

✅ Firestore Database Storage:

Stores user details in Firestore (excluding passwords for security).

✅ Password Visibility Toggle & Validation Checklist

Allows users to toggle password visibility.

Displays real-time password strength validation.

🚀 Installation & Setup

Clone the repository

git clone https://github.com/your-repo-url.git
cd your-project-folder

Install dependencies

npm install

Set up Firebase

Create a Firebase project at Firebase Console.

Enable Authentication (Email & Password).

Enable Firestore Database.

Create a .env file and add Firebase credentials:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

Run the project

npm start

📂 Project Structure

registration-app/
├── .gitignore
├── package-lock.json
├── package.json
├── README.md (to be created)
└── src/
    ├── App.css
    ├── App.js
    ├── index.css
    ├── index.js
    └── components/
        ├── Dashboard.js
        ├── Login.js
        ├── Registration.css
        ├── Registration.js
        └── firebaseConfig.js

🔥 Future Enhancements

Implement forgot password functionality.

Add user profile management.

Enhance UI/UX with Tailwind CSS or Material UI.
