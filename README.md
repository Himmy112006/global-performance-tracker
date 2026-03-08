# HR Pulse.io | Employee Performance Tracker

A full-stack web application designed for HR departments to manage employee records, track performance ratings, and analyze team statistics in real-time.

## 🚀 Features
- **Real-time Analytics:** Automatically calculates average team ratings and staff counts.
- **Full CRUD Support:** Add, View, and Delete employee records instantly.
- **Instant Search:** Filter employees by Name, Role, or Department.
- **Cloud Database:** Powered by Supabase (PostgreSQL) for reliable data storage.
- **Modern UI:** Responsive dashboard design with a clean, professional interface.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** Supabase / PostgreSQL
- **Environment:** Dotenv for secure API management

## 📦 Installation & Setup

### 1. Database Setup
- Create a table in Supabase named `employees` with columns: `id`, `name`, `email`, `role`, `department`, `rating`, and `feedback`.

### 2. Backend Setup
```bash
cd server
npm install
node index.js