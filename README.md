# User Management System

A MERN stack application with email verification and role-based authentication.

---

🔗 [Live Demo](https://user-management-ui-tau.vercel.app)

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MySQL
- **Database:** MySQL (Railway)
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/user-management.git
cd USER MANAGEMENT
```

### 2. Backend Setup:

Navigate to the backend folder:

```bash
cd user-management-backend
npm install
```

Create a .env file:

PORT=5000

FRONTEND_URL=http://localhost:5173

DB_HOST=your_db_host

DB_USER=your_db_user

DB_PASSWORD=your_db_password

DB_NAME=your_db_name

JWT_SECRET=your_jwt_secret

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup:

Navigate to the frontend folder:

```bash
cd user-management-frontend
npm install
```

Create a .env file:

VITE_BACKEND_URL=http://localhost:5000

Start the frontend:

```bash
npm run dev
```

### 4. Database Setup

Create a MySQL database on Railway.

Update .env in the backend with the database credentials.

### 5. Deployment

Frontend: Deploy on Vercel.

Backend: Deploy on Render.
