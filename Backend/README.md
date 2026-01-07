# Sports Hub Backend

Node.js + Express + MongoDB backend for Sports Hub e-commerce platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   
   Create `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/SportsHub
   PORT=4000
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system

4. **Run the Backend**
   ```bash
   # Build TypeScript
   npm run build
   
   # Start server
   npm start
   ```

## 📊 API Endpoints

- **Health Check**: `GET /api/health`
- **Products**: `GET /api/products`, `GET /api/products/:id`
- **Categories**: `GET /api/categories`, `GET /api/categories/:id`
- **Authentication**: `POST /api/auth/login`, `POST /api/auth/register`

## 🗄️ Database

- **MongoDB**: Automatic seeding with 90 sports products
- **Collections**: products, categories, users
- **Sports**: Cricket, Football, Kabaddi, Basketball, Hockey, Tennis, Badminton, Volleyball, Chess

## 🔧 Available Scripts

- `npm run build` - Compile TypeScript
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## 🌐 Server URL

Backend runs on: `http://localhost:4000`

---

**Built for the Sports Hub e-commerce platform**