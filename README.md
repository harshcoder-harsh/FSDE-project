# FSDE-Project (Noir Edition)

A premium, full-stack e-commerce web application featuring a monochromatic "Noir" aesthetic, high-end animations, authentication, and a fully functional payment gateway.

## 🌟 Features

- **Premium UI/UX:** High-end glassmorphism design, smooth Framer Motion animations, and a responsive luxury grid layout.
- **Full-Stack Architecture:** 
  - Frontend: React 18, Vite, Tailwind CSS, Framer Motion, Zustand.
  - Backend: Node.js, Express, TypeScript, MongoDB (Mongoose).
- **Authentication:** Secure JWT-based Login and Sign-Up flows using bcrypt password hashing. Unauthenticated users are automatically redirected.
- **Payment Gateway:** Fully integrated with Stripe Checkout Sessions for secure payment processing.
- **Dynamic Collection:** Automatically seeds and serves 80 meticulously curated luxury items from MongoDB.
- **Performance Optimized:** Includes lazy loading, pagination for the product grid, and Brotli/Gzip compression (`vite-plugin-compression`) for lightning-fast deployments.

## 📁 Repository Structure

The project is structured as a monorepo workspace containing two main directories:

- `/frontend` - The React Vite frontend application.
- `/backend` - The Node.js Express backend application.

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB URI (Atlas or local)
- Stripe Account (Secret Key)

### 1. Install Dependencies
Run the following from the root directory to install dependencies for both the frontend and backend:
```bash
npm run install:all
```
*(Or simply run `npm install` in the root).*

### 2. Environment Variables
Create a `.env` file inside the `/backend` directory:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0...
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_KEY
JWT_SECRET=your_jwt_secret
FRONTEND_ORIGIN=http://localhost:5173
PORT=3001
```

Create a `.env` file inside the `/frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:3001
```

### 3. Run the Development Servers
From the root directory, start both frontend and backend concurrently:
```bash
npm run dev
```
- The frontend will be available at `http://localhost:5173`
- The backend API will be available at `http://localhost:3001`

## ☁️ Deployment Guide (Render)

### Backend Deployment (Web Service)
1. **Build Command:** `yarn install; yarn build` (or `npm install && npm run build`)
2. **Start Command:** `yarn start` (or `npm start`)
3. **Environment Variables:**
   - `MONGODB_URI`: Your MongoDB connection string.
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (`sk_test_...`).
   - `JWT_SECRET`: A secure random string.
   - `FRONTEND_ORIGIN`: The URL of your deployed frontend (e.g., `https://fsde-project.onrender.com`).
   - `PORT`: `10000` (or leave default, Render will assign one).

### Frontend Deployment (Static Site)
1. **Build Command:** `npm install && npm run build`
2. **Publish Directory:** `dist`
3. **Environment Variables:**
   - `VITE_API_BASE_URL`: Your deployed backend URL (e.g., `https://fsde-project-api.onrender.com`).
4. **Routing Rules:** Add a rewrite rule for React Router:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

## 🛠️ API Endpoints

- `GET /api/health` - Check if the server, MongoDB, and Stripe are configured correctly.
- `GET /api/products` - Fetch all available products.
- `POST /api/signup` - Register a new user.
- `POST /api/login` - Authenticate a user and receive a JWT.
- `POST /api/create-checkout-session` - Initialize a Stripe payment session.
- `POST /api/orders` - Save a completed order to the database.

## 🎨 Built With
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Zustand, Lucide React.
- **Backend:** Node.js, Express, Mongoose, Stripe API, JWT, bcryptjs.
- **Tooling:** TypeScript, concurrently, ESLint.