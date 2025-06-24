# 🎓 LearnLink — Connect Learners with Educators

**LearnLink** is an educational platform that bridges the gap between learners and educators. It enables users to explore online courses, book real-time tutoring sessions, join forums, and follow personalized learning paths. Built for accessibility and scalability, LearnLink encourages collaborative education in a digital-first world.

---

## 🌟 Features

- 👤 **User Profiles**  
  Profiles for both learners and educators to track progress, enrolled courses, and activity.

- 🔍 **Course Discovery**  
  Filter and search courses by topic, difficulty level, and popularity.

- ⏱️ **Real-Time Tutoring**  
  Live one-on-one tutoring sessions with educators.

- ⭐ **Course Reviews & Ratings**  
  Transparent feedback system for both courses and tutors.

- 🧭 **Learning Path Creation**  
  Educators can curate structured learning journeys.

- 💬 **Discussion Forums**  
  A space for learners and teachers to share resources, discuss ideas, and solve doubts collaboratively.

---

## 🧰 Tech Stack

### 🔹 Frontend
- React.js
- TypeScript
- Tailwind CSS
- Material UI

### 🔹 Backend
- Node.js
- Express.js
- MongoDB

### 🔐 Authentication
- JWT (JSON Web Tokens)

### 🚀 DevOps & Deployment
- GitHub Actions (CI/CD Pipelines)

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/pateladiti0401/LearnLink.git
cd LearnLink
```
### 2. Install Dependencies

🔹 Frontend

```bash
cd frontend
npm install
```
🔹 Backend

```bash
cd backend
npm install
```

### 3. Setup Environment Variables

Create a .env file in the /backend directory with values like:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### 4. Run Development Servers

🔹 Start Backend

```bash
cd backend
npm run dev
```

🔹 Start Frontend

```bash
cd frontend
npm start
```
