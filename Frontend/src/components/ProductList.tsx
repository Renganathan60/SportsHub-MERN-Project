import { useState, useMemo } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/mockData';
import { Product } from '../types';
import ProductDetails from './ProductDetails';

interface ProductListProps {
  searchQuery?: string;
}

export default function ProductList({ searchQuery = '' }: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  

  const { products, addToCart, addToWishlist, isInWishlist, searchProducts } = useStore();

  const filteredProducts = useMemo(() => {
    let filtered = searchQuery ? searchProducts(searchQuery) : products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }


    filtered = [...filtered].sort((a, b) => b.rating - a.rating);

    // limit to max 15 per selected sport/category when a category is selected
    if (selectedCategory !== 'all') {
      filtered = filtered.slice(0, 15);
    }
    return filtered;
  }, [products, searchQuery, selectedCategory, searchProducts]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  if (selectedProduct) {
    return <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Filter by Sport</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-sport-primary-600 text-white shadow-lg' 
                  : 'bg-white text-slate-800 hover:bg-sport-primary-50 border border-slate-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-sport-primary-600 text-white shadow-lg' 
                    : 'bg-white text-slate-800 hover:bg-sport-primary-50 border border-slate-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-slate-900">
              {searchQuery ? `Results for "${searchQuery}"` : 'Professional Collection'}
              <span className="text-sm text-slate-600 ml-3">
                ({filteredProducts.length} items)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inWishlist = isInWishlist(product.id);
              
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-sport-primary-600 text-white text-xs sm:text-sm font-bold rounded-full">
                        NEW
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleToggleWishlist(product, e)}
                      className={`absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 rounded-full transition-all ${
                        inWishlist
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-white/90 text-slate-700 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 sm:w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>
                    {product.stock < 20 && (
                      <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Low Stock
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 lg:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm sm:text-base text-slate-800 mb-3 sm:mb-4 capitalize font-medium">{product.type}</p>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 sm:w-5 h-5 fill-current" />
                        <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                      </div>
                      <span className="text-xs text-slate-600">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm sm:text-base lg:text-lg text-slate-700 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-green-700 font-semibold">Medium Price Range</span>
                        <div className="text-xs text-slate-600 mt-1">
                          {product.stock} in stock
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="p-2.5 sm:p-3 bg-sport-primary-600 text-white rounded-xl hover:bg-sport-primary-700 hover:shadow-lg transition-all duration-300"
                      >
                        <ShoppingCart className="w-5 h-5 sm:w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
              <p className="text-lg text-slate-700">No gear found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
