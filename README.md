# DevNest

DevNest is a **developer-focused project management application** designed around **Agile methodology**. It combines a sprint-based task management system with **AI-powered task generation** to help teams and individuals plan, track, and deliver projects efficiently.

🔗 Live Demo
[Try DevNest Live](https://devnest.molla.dev) 

## 🚀 Features

- **Sprint-Based Project Management** – Organize tasks into sprints with defined start/end dates and goals.
- **AI-Powered Task Generation** – Generate tasks automatically based on project requirements using AI.
- **Task & Sprint Management** – Create, assign, and track tasks with due dates, status, and priorities.
- **Project Workspaces** – Centralized hub for project details, tasks, notes, and members.
- **User Authentication** – Secure login with Google OAuth 2.0 and JWT.
- **Responsive UI** – Built with a clean, developer-friendly interface for both desktop and mobile use.
- **Real-Time Updates** – Keep everyone in sync without manual refreshes.

## 🛠 Tech Stack

**Frontend**
- React
- Tailwind CSS
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose

**Other Tools**
- JWT for authentication
- AI integration (Gemini API) for task generation

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Emanuel-DevX/devnest.git
cd devnest
```

### 2. Install dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 3. Set up environment variables

**Frontend (client/.env)**
```env
VITE_PUBLIC_API_URL=http://localhost:4001
```

**Backend (server/.env)**
```env
PORT=4001
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>
GEMINI_API_KEY=<gemini-api-key>
FRONTEND_URL=http://localhost:4000
```

### 4. Run the application

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```
