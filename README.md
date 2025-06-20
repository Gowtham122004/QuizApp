# 🎯 QuizApp - Full Stack Quiz Application

QuizApp is a full-featured quiz application built using the MERN stack (MongoDB, Express.js, React or plain HTML/CSS/JS, and Node.js). It allows users to register, log in, and take multiple-choice quizzes with real-time scoring and authentication.

---

## 🚀 Features

- 🔐 User Registration and Login with secure password storage
- ✅ Real-time form validation using JavaScript
- 📚 Quiz functionality with multiple questions and instant feedback
- 🗃️ MongoDB integration for storing users and quiz data
- 📦 Clean project structure with separate frontend and backend
- 🧾 Error handling with feedback messages displayed in-page
- 🌐 Responsive frontend design using HTML, CSS and JS

---

## 🛠️ Tech Stack

| Layer         | Technology              |
|---------------|--------------------------|
| Frontend      | HTML, CSS, JavaScript    |
| Backend       | Node.js, Express.js      |
| Database      | MongoDB (local or Atlas) |
| Authentication| Custom Auth / Sessions   |

---

## 📁 Project Structure

quiz-app-fullstack/
│
├── public/ # Frontend files (HTML/CSS/JS)
│ ├── index.html # Landing page
│ ├── login.html # Login form
│ ├── register.html # Registration form
│ └── js/
│ └── validation.js # Form validation and fetch requests
│
├── models/ # Mongoose models
│ └── User.js
│
├── routes/ # Express routes
│ ├── auth.js # Register & login logic
│ └── api.js # Quiz logic
│
├── .gitignore # Files/folders to ignore (e.g., node_modules)
├── server.js # Main server file
├── package.json
└── README.md # This file

yaml
Copy
Edit

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Gowtham122004/QuizApp.git
cd QuizApp
2. Install dependencies
bash
Copy
Edit
npm install
3. Run MongoDB
Make sure MongoDB is installed and running on your machine:

bash
Copy
Edit
mongod
Or connect to MongoDB Atlas.

4. Start the server
bash
Copy
Edit
node server.js
Server runs at: http://localhost:5000

🧪 Usage
Go to /register.html to create a new user.

Log in via /login.html.

You’ll be redirected to index.html.

(Optional) Take quizzes and track your score.

📌 TODO / Future Improvements
Add timer to each quiz question

Add admin dashboard to manage quizzes

Add email verification during signup

Migrate to frontend framework (React or Vue)

🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

📜 License
MIT License — use this project freely.

📬 Contact
GitHub: Gowtham122004
Project: QuizApp

yaml
Copy
Edit
