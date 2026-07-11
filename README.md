# 🏏 SportsHub MERN Project

Full-stack sports e-commerce platform built with React.js, Node.js, Express.js & MongoDB. Features product browsing, cart, secure checkout & JWT authentication.

## 🚀 Project Overview

SportsHub is a modern sports e-commerce platform designed specifically for the Indian market, featuring:

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + TypeScript
- **Database**: MongoDB with automatic data seeding
- **Authentication**: JWT-based user authentication
- **Payment**: Indian Rupee (₹) currency support
- **Sports Focus**: Cricket, Football, Kabaddi, Basketball, Hockey, Tennis, Badminton, Volleyball, Chess

## 📁 Project Structure

```
SportsHub-MERN-Project/
├── Frontend/                 # React Frontend Application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.tsx # Main homepage
│   │   │   ├── ProductList.tsx # Product catalog
│   │   │   ├── Cart.tsx      # Shopping cart
│   │   │   ├── Login.tsx     # Authentication
│   │   │   └── ...           # Other components
│   │   ├── context/         # Context providers
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── data/            # Mock data
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.ts       # Vite configuration
│
├── Backend/                  # Node.js Backend API
│   ├── src/
│   │   ├── models/          # MongoDB models
│   │   │   ├── Product.ts   # Product schema
│   │   │   ├── Category.ts  # Category schema
│   │   │   └── User.ts      # User schema
│   │   ├── routes/          # API routes
│   │   │   ├── products.ts  # Product endpoints
│   │   │   ├── categories.ts # Category endpoints
│   │   │   └── auth.ts      # Authentication endpoints
│   │   └── index.ts         # Server entry point
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript configuration
│
└── README.md                # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Renganathan60/SportsHub-MERN-Project.git
cd SportsHub-MERN-Project
```

### 2. Setup Backend
```bash
cd Backend
npm install

# Create .env file with your MongoDB connection
echo "MONGODB_URI=mongodb://localhost:27017/SportsHub
PORT=4000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production" > .env

# Start the backend server
npm run dev
```

### 3. Setup Frontend
```bash
cd ../Frontend
npm install

# Start the frontend development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

## 📊 Features

### 🛒 E-commerce Features
- **Product Catalog**: 90+ sports products across 9 categories
- **Shopping Cart**: Add/remove items, quantity management
- **Wishlist**: Save favorite products
- **User Authentication**: Secure login/signup with JWT
- **Order Management**: Order history and tracking
- **Search & Filter**: Find products by category, price, sport

### 🎨 UI/UX Features
- **Modern Design**: Sky blue theme with professional layout
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Indian Market**: ₹ currency, Indian sports focus
- **Professional Images**: High-quality product photography
- **Smooth Animations**: Enhanced user experience

### 🔧 Technical Features
- **RESTful API**: Clean, organized API endpoints
- **JWT Authentication**: Secure user sessions
- **MongoDB Integration**: Persistent data storage
- **TypeScript**: Type safety throughout the application
- **Real-time Updates**: Dynamic data synchronization
- **Error Handling**: Comprehensive error management

## 🗄️ Database

The application automatically seeds the MongoDB database with:

### Sports Products (90 items)
- **Cricket**: Bats, balls, helmets, pads, gloves
- **Football**: Boots, balls, jerseys, shin guards
- **Kabaddi**: Mats, uniforms, protective gear
- **Basketball**: Balls, shoes, hoops, uniforms
- **Hockey**: Sticks, balls, protective gear
- **Tennis**: Rackets, balls, shoes, strings
- **Badminton**: Rackets, shuttlecocks, shoes
- **Volleyball**: Balls, nets, knee pads
- **Chess**: Sets, boards, clocks

### Sample Data
- **Categories**: 9 sports categories with descriptions
- **Users**: Test accounts for development
- **Products**: Realistic pricing in Indian Rupees (₹)

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with auto-reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products?category=cricket` - Filter by category

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Health Check
- `GET /api/health` - Server health status

## 🎯 Key Components

### Frontend Components
- **Dashboard**: Homepage with featured products and categories
- **ProductList**: Filterable and searchable product catalog
- **ProductDetails**: Individual product pages with full details
- **Cart**: Shopping cart with quantity management
- **Wishlist**: Favorite products management
- **Login/Signup**: User authentication forms
- **UserProfile**: User account management

### Backend Models
- **User**: User authentication, profile, and order history
- **Product**: Complete product information with pricing
- **Category**: Product categorization and organization

## 🔒 Environment Variables

Create a `.env` file in the Backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/SportsHub
PORT=4000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd Frontend
npm run build
# Deploy the 'dist' folder to your hosting platform
```

### Backend Deployment (Heroku/Railway/Render)
```bash
cd Backend
npm run build
# Set environment variables on your hosting platform
# Deploy with the built files
```

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your environment variables

## 🎨 Screenshots

### Homepage
- Modern sky blue theme
- Featured products carousel
- Category navigation
- Search functionality

### Product Catalog
- Grid/list view toggle
- Advanced filtering
- Sort by price, popularity
- Pagination

### Shopping Cart
- Item management
- Quantity controls
- Price calculations
- Checkout process

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Renganathan60**
- GitHub: [@Renganathan60](https://github.com/Renganathan60)
- Email: rn@1175971@gmail.com

## 🙏 Acknowledgments

- Built for the Indian sports community
- Inspired by modern e-commerce platforms
- Uses professional sports equipment imagery
- Optimized for Indian market preferences
- Special thanks to the open-source community

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the documentation above
2. Open an issue on GitHub
3. Contact the author

---

**Built with ❤️ for the Sports Community in India** 🇮🇳

## 🔄 Version History

- **v1.0.0** - Initial release with complete MERN stack implementation
- Full e-commerce functionality
- 90+ sports products
- Modern responsive UI
- JWT authentication
- MongoDB integration
