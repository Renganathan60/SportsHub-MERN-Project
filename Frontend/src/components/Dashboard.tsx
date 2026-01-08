import { useState, useEffect } from 'react';
import { 
  Trophy, ShoppingCart, Heart, Star, X, Search, LogOut, 
  Menu, User, Play, Zap, Award, Target, Activity,
  Phone, Mail, Facebook, Twitter, Instagram, Youtube, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import AnimatedBackground from './AnimatedBackground';
import { useStore } from '../context/StoreContext';
import ProductList from './ProductList';
import Cart from './Cart';
import Wishlist from './Wishlist';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';
import Checkout from './Checkout';
import ProductDetails from './ProductDetails';

type View = 'home' | 'products' | 'cart' | 'wishlist' | 'profile' | 'orders' | 'checkout' | 'details';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [playerLevel, setPlayerLevel] = useState('all');
  const [productType, setProductType] = useState('all');
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const { cart, wishlist, getRecommendedProducts } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  // Enhanced hero slides for sports e-commerce - Sky Blue Theme
  const heroSlides = [
    {
      id: 1,
      title: "SEASONAL CLEARANCE SALE",
      subtitle: "Up to 70% OFF",
      description: "Premium sports equipment at unbeatable prices. Limited time offer!",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      cta: "Shop Now",
      badge: "CLEARANCE SALE",
      color: "from-sky-500 to-blue-600"
    },
    {
      id: 2,
      title: "CRICKET WORLD CUP SPECIAL",
      subtitle: "Professional Cricket Gear",
      description: "Get match-ready with authentic cricket equipment used by professionals",
      image: "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg",
      cta: "Explore Cricket",
      badge: "WORLD CUP SPECIAL",
      color: "from-sky-600 to-cyan-600"
    },
    {
      id: 3,
      title: "FITNESS REVOLUTION",
      subtitle: "Transform Your Workout",
      description: "Premium gym equipment for serious fitness enthusiasts",
      image: "https://images.pexels.com/photos/1263429/pexels-photo-1263429.jpeg",
      cta: "Start Training",
      badge: "FITNESS SPECIAL",
      color: "from-sky-500 to-blue-500"
    }
  ];

  // Enhanced categories for Indian sports market
  const categories = [
    { id: 'all', name: 'All Sports', icon: Trophy },
    { id: 'cricket', name: 'Cricket', icon: Target },
    { id: 'football', name: 'Football', icon: Activity },
    { id: 'kabaddi', name: 'Kabaddi', icon: Zap },
    { id: 'badminton', name: 'Badminton', icon: Award },
    { id: 'gym', name: 'Gym', icon: Activity },
    { id: 'fitness', name: 'Fitness', icon: Heart }
  ];

  // Product filter options
  const playerLevels = ['Beginner', 'Intermediate', 'Professional', 'Elite'];
  const productTypes = ['Equipment', 'Apparel', 'Footwear', 'Accessories'];

  // Shop by Sport sidebar items
  const shopByCategories = [
    { name: 'Running Shoes', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', count: '150+ items' },
    { name: 'Training Shoes', image: 'https://images.pexels.com/photos/1263429/pexels-photo-1263429.jpeg', count: '200+ items' },
    { name: 'Outdoor Gear', image: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg', count: '300+ items' },
    { name: 'Safety Equipment', image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg', count: '100+ items' }
  ];

  // Trusted sports brands
  const trustedBrands = [
    { name: 'NIKE', logo: '🏃‍♂️' },
    { name: 'adidas', logo: '⚽' },
    { name: 'PUMA', logo: '🐆' },
    { name: 'Reebok', logo: '💪' },
    { name: 'UNDER ARMOUR', logo: '🏋️‍♂️' },
    { name: 'ASICS', logo: '👟' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('products');
    }
  };

  const go = (view: View) => {
    if (!user && view !== 'home' && view !== 'products') {
      setShowLogin(true);
      return;
    }
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  // Auto-close login modal when user logs in
  if (showLogin && user) {
    setShowLogin(false);
  }

  const featuredProducts = getRecommendedProducts(4);

  // Cycle hero every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 relative">
      <AnimatedBackground intensity="subtle" />
      
      {/* Advanced Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          {/* Top Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-between py-2 text-xs sm:text-sm border-b border-slate-100">
            <div className="flex items-center gap-3 lg:gap-6 text-slate-800">
              <div className="flex items-center gap-1 sm:gap-2">
                <Phone className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6" />
                <span className="font-medium">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Mail className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6" />
                <span className="font-medium">support@sportshub.in</span>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Facebook className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-slate-600 hover:text-sky-600 cursor-pointer transition-colors" />
                <Twitter className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-slate-600 hover:text-sky-500 cursor-pointer transition-colors" />
                <Instagram className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-slate-600 hover:text-sky-400 cursor-pointer transition-colors" />
                <Youtube className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-slate-600 hover:text-sky-600 cursor-pointer transition-colors" />
              </div>
              {user && (
                <div className="flex items-center gap-1 sm:gap-2 text-sport-primary-600">
                  <Star className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 fill-current" />
                  <span className="font-semibold text-xs sm:text-sm">{user.loyaltyPoints || 0} Points</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between py-2 sm:py-4">
            {/* Logo - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => go('home')}>
              <div className="relative">
                <Trophy className="w-8 h-8 sm:w-12 h-12 lg:w-16 lg:h-16 text-sport-primary-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div>
                  <h1 className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-sport-primary-600 via-sport-primary-500 to-sport-primary-400 bg-clip-text text-transparent">
                    Sports Hub
                  </h1>
                  <p className="text-xs sm:text-xs lg:text-xs text-slate-700 font-medium">PREMIUM ATHLETICS</p>
                </div>
                {/* Shield Icon - Hidden on mobile */}
                <div className="hidden sm:block ml-1 lg:ml-2">
                  <svg className="w-8 h-8 sm:w-12 h-12 lg:w-16 lg:h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden xl:flex items-center gap-4 2xl:gap-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setCategoryFilter(category.id);
                      setCurrentView('products');
                    }}
                    className={`flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 rounded-xl font-semibold transition-all duration-300 ${
                      categoryFilter === category.id
                        ? 'bg-sport-primary-600 text-white shadow-lg'
                        : 'text-slate-800 hover:text-sport-primary-600 hover:bg-sport-primary-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 lg:w-6 h-6 xl:w-8 xl:h-8" />
                    <span className="text-sm lg:text-base">{category.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
              {/* Advanced Search - Hidden on mobile */}
              <form onSubmit={handleSearch} className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 w-5 h-5 lg:w-6 h-6 xl:w-8 xl:h-8 text-slate-600" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium gear..."
                    className="w-48 lg:w-64 xl:w-80 pl-12 lg:pl-14 xl:pl-16 pr-4 py-2 lg:py-3 rounded-xl lg:rounded-2xl bg-slate-100/80 border border-slate-300 focus:bg-white focus:border-sport-primary-300 focus:ring-4 focus:ring-sport-primary-100 transition-all duration-300 text-sm font-medium text-slate-800"
                  />
                </div>
              </form>

              {/* Action Buttons - Responsive */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => go('wishlist')}
                  className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                    currentView === 'wishlist'
                      ? 'bg-sport-primary-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-sport-primary-50 hover:text-sport-primary-600'
                  }`}
                >
                  <Heart className="w-5 h-5 sm:w-6 h-6 lg:w-8 lg:h-8" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => go('cart')}
                  className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                    currentView === 'cart'
                      ? 'bg-sport-primary-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-sport-primary-50 hover:text-sport-primary-600'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 h-6 lg:w-8 lg:h-8" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
                      {cart.length}
                    </span>
                  )}
                </button>

                {user ? (
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => go('profile')}
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                        currentView === 'profile'
                          ? 'bg-sport-primary-600 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-sport-primary-50 hover:text-sport-primary-600'
                      }`}
                    >
                      <User className="w-5 h-5 sm:w-6 h-6 lg:w-8 lg:h-8" />
                    </button>
                    <button
                      onClick={logout}
                      className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5 sm:w-6 h-6 lg:w-8 lg:h-8" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-sport-primary-600 to-sport-primary-500 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
                  >
                    Sign In
                  </button>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="xl:hidden p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 hover:bg-sport-primary-50 hover:text-sport-primary-600 transition-all duration-300"
                >
                  <Menu className="w-5 h-5 sm:w-6 h-6 lg:w-8 lg:h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Responsive */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="w-full mb-4">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 h-6 lg:w-8 lg:h-8 text-slate-600" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium gear..."
                    className="w-full pl-12 sm:pl-14 lg:pl-16 pr-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-slate-100 border border-slate-300 focus:bg-white focus:border-sport-primary-300 transition-all duration-300 text-slate-800 text-sm sm:text-base"
                  />
                </div>
              </form>
              
              {/* Mobile Categories Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setCategoryFilter(category.id);
                        setCurrentView('products');
                      }}
                      className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 hover:bg-sport-primary-50 transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 sm:w-7 h-7 lg:w-8 lg:h-8 text-sport-primary-600" />
                      <span className="font-medium text-slate-800 text-xs sm:text-sm lg:text-base">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative">
        {currentView === 'home' && (
          <div className="space-y-0">
            {/* Advanced Hero Section with Seasonal Offers */}
            <section className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden">
              <div className="absolute inset-0">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      index === heroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  </div>
                ))}
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
                  <div className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-xs sm:text-sm lg:text-base font-bold text-white mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r ${heroSlides[heroIndex].color} animate-pulse shadow-lg`}>
                    {heroSlides[heroIndex].badge}
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-2 sm:mb-3 lg:mb-4 leading-tight">
                    {heroSlides[heroIndex].title}
                  </h1>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-yellow-400 mb-2 sm:mb-3 lg:mb-4">
                    {heroSlides[heroIndex].subtitle}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                    {heroSlides[heroIndex].description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => setCurrentView('products')}
                      className={`w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 bg-gradient-to-r ${heroSlides[heroIndex].color} text-white rounded-xl lg:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg`}
                    >
                      <Play className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6" />
                      {heroSlides[heroIndex].cta}
                    </button>
                    <div className="text-white text-sm sm:text-base lg:text-lg">
                      <span className="font-semibold">Free Shipping</span> on orders above ₹999
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Navigation */}
              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setHeroIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === heroIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </section>

            {/* Smart Product Filter Section */}
            <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Find Your Perfect Gear</h2>
                  <p className="text-slate-600">Filter by sport, level, and category to discover equipment tailored for you</p>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Sport Type Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Sport Type</label>
                      <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-sport-primary-500 focus:border-sport-primary-500 transition-all"
                      >
                        <option value="all">All Sports</option>
                        {categories.slice(1).map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Player Level Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Player Level</label>
                      <select 
                        value={playerLevel}
                        onChange={(e) => setPlayerLevel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-sport-primary-500 focus:border-sport-primary-500 transition-all"
                      >
                        <option value="all">All Levels</option>
                        {playerLevels.map(level => (
                          <option key={level} value={level.toLowerCase()}>{level}</option>
                        ))}
                      </select>
                    </div>

                    {/* Product Category Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
                      <select 
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-sport-primary-500 focus:border-sport-primary-500 transition-all"
                      >
                        <option value="all">All Categories</option>
                        {productTypes.map(type => (
                          <option key={type} value={type.toLowerCase()}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                      <button
                        onClick={() => setCurrentView('products')}
                        className="w-full px-6 py-3 bg-sport-primary-600 text-white rounded-xl font-semibold hover:bg-sport-primary-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Search className="w-5 h-5" />
                        Find Products
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shop by Sport Sidebar & Featured Categories */}
            <section className="py-8 sm:py-12 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-4 gap-8">
                  {/* Shop by Sport Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Shop by Sport</h3>
                      <div className="space-y-4">
                        {shopByCategories.map((category, index) => (
                          <div key={index} className="group cursor-pointer" onClick={() => setCurrentView('products')}>
                            <div className="relative overflow-hidden rounded-xl mb-3">
                              <img 
                                src={category.image} 
                                alt={category.name}
                                className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute bottom-2 left-2 text-white">
                                <div className="text-sm font-bold">{category.name}</div>
                                <div className="text-xs opacity-90">{category.count}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured Product Categories */}
                  <div className="lg:col-span-3">
                    <div className="mb-8">
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Featured Categories</h2>
                      <p className="text-slate-600">Discover our most popular sports equipment categories</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {/* Performance Category */}
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer" onClick={() => setCurrentView('products')}>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold mb-2">Performance</h3>
                          <p className="text-blue-100 mb-4">Professional-grade equipment for peak performance</p>
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <span>Shop Now</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">🏆</div>
                      </div>

                      {/* Comfort Category */}
                      <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer" onClick={() => setCurrentView('products')}>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold mb-2">Comfort</h3>
                          <p className="text-green-100 mb-4">Ergonomic designs for maximum comfort during play</p>
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <span>Shop Now</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">💪</div>
                      </div>
                    </div>

                    {/* Injury Prevention Category */}
                    <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden group cursor-pointer mb-8" onClick={() => setCurrentView('products')}>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Injury Prevention & Safety</h3>
                        <p className="text-red-100 mb-4">Protective gear and safety equipment to keep you playing safely</p>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <span>Shop Safety Gear</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">🛡️</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trusted Sports Partners & Brands */}
            <section className="py-8 sm:py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Trusted Sports Partners</h2>
                  <p className="text-slate-600">Official partners and premium brands we work with</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
                  {trustedBrands.map((brand, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 text-center hover:bg-sport-primary-50 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <div className="text-3xl sm:text-4xl mb-3">{brand.logo}</div>
                        <div className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-sport-primary-600 transition-colors">
                          {brand.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Discount Banners */}
            <section className="py-8 sm:py-12 bg-gradient-to-r from-sport-primary-600 to-sport-primary-500">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-white">
                    <h2 className="text-3xl sm:text-4xl font-black mb-4">Limited Time Offers</h2>
                    <p className="text-xl mb-6 text-blue-100">Get up to 50% off on premium sports equipment</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => setCurrentView('products')}
                        className="px-8 py-4 bg-white text-sport-primary-600 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Shop Sale Items
                      </button>
                      <div className="text-white/90">
                        <div className="text-sm font-semibold">Free shipping on orders above</div>
                        <div className="text-2xl font-black">₹999</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                      <div className="text-center text-white">
                        <div className="text-6xl font-black mb-2">50%</div>
                        <div className="text-xl font-semibold">OFF</div>
                        <div className="text-sm opacity-90 mt-2">On selected items</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Products with Rich Cards */}
            <section className="py-8 sm:py-12 lg:py-16 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 lg:mb-12">
                  <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-1 sm:mb-2">Featured Products</h2>
                    <p className="text-base sm:text-lg lg:text-xl text-slate-800">Performance, comfort, and safety in every product</p>
                  </div>
                  <button
                    onClick={() => setCurrentView('products')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 bg-sport-primary-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    View All Products
                    <ChevronRight className="w-4 h-4 sm:w-5 h-5 lg:w-8 lg:h-8" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentView('details');
                      }}
                      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
                          <span className="px-2 py-1 sm:px-3 sm:py-1 bg-sport-primary-600 text-white text-xs sm:text-sm font-bold rounded-full">
                            FEATURED
                          </span>
                          <span className="px-2 py-1 sm:px-3 sm:py-1 bg-green-500 text-white text-xs sm:text-sm font-bold rounded-full">
                            SAFE
                          </span>
                        </div>
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                          <button className="p-1.5 sm:p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                            <Heart className="w-4 h-4 sm:w-5 h-5 lg:w-8 lg:h-8 text-slate-700" />
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
                            <div className="flex items-center gap-1 mb-1">
                              <Trophy className="w-3 h-3" />
                              <span>Performance Grade</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>Comfort Certified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5 lg:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm sm:text-base text-slate-800 mb-3 sm:mb-4 capitalize font-medium">{product.type}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <span className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900">₹{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm sm:text-base lg:text-lg text-slate-700 line-through">₹{product.originalPrice}</span>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm text-green-700 font-semibold">Medium Price Range</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 fill-current" />
                            <span className="text-xs sm:text-sm font-semibold text-slate-900">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'products' && <ProductList searchQuery={searchQuery} />}
        {currentView === 'details' && selectedProduct && <ProductDetails product={selectedProduct} onClose={() => { setSelectedProduct(null); setCurrentView('home'); }} />}
        {currentView === 'cart' && <Cart onCheckout={() => go('checkout')} />}
        {currentView === 'wishlist' && <Wishlist />}
        {currentView === 'profile' && <UserProfile />}
        {currentView === 'orders' && <OrderHistory />}
        {currentView === 'checkout' && <Checkout onSuccess={() => go('orders')} />}
      </main>

      {/* Login Modal - Fully Responsive */}
      {showLogin && (
        <div className="fixed inset-0 z-[60] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 lg:right-6 lg:top-6 z-10 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-300"
            >
              <X className="w-5 h-5 sm:w-6 h-6 lg:w-8 lg:h-8" />
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}