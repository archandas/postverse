# 🚀 PostVerse

**PostVerse** is an AI-powered platform that allows users to input their thoughts and generate tailored post versions for various social media platforms like Twitter, Threads, LinkedIn and more.

---

## 🛠️ Tech Stack

### 🔹 Frontend

* **React.js** (with Vite)
* **Framer Motion** – for beautiful animations
* **shadcn/ui** – UI components
* **Swiper.js** – for carousels
* **Material UI**
* **Lucide-react** & **Font Awesome Icons**

### 🔹 Backend

* **Node.js + Express**
* **Passport.js** – for authentication (with session support)
* **REST API**
* **Mongoose** – MongoDB Atlas

### 🔹 AI Integration

* **GPT-4.1 API** (via  OpenAI endpoint)
* Generates platform-specific captions/posts

---

## ✨ Features

* ✍️ Input your thoughts or rough ideas
* 🤖 Get optimized captions for different social media platforms
* 🧠 AI-generated variants using GPT-4.1
* 🔐 User authentication (signup/login/logout)
* 💬 Clean and responsive UI
* ☁️ Hosted on **Render**

---

## 📁 Folder Structure

post-verse/
├── client/ # React frontend
├── server/ # Express backend
├── README.md

---

## 📦 Install Frontend & Backend Dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

---

## 🚀 Run the Project Locally

### Start Backend Server

```bash
cd server
node/nodemon index.js
```

### Start Frontend (React App)

```bash
cd client
npm run dev
```

Make sure you have environment variables set up in both `client/.env` and `server/.env` for things like API keys, MongoDB URI, and session secrets.
