import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleAddToCart = (item: any) => {
    addToCart(item.product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-md animate-fade-in border border-gray-200">
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-lg font-bold mb-2 text-gray-900">Your wishlist is empty</h2>
        <p className="text-gray-600 text-sm">Save your favorite items here!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover-lift transition-all duration-300 border border-gray-200"
          >
            <div className="relative h-48">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-full object-cover img-muted"
              />
              <button
                onClick={() => removeFromWishlist(item.product.id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-3 space-y-2">
              <h3 className="font-semibold text-sm truncate text-gray-900">{item.product.name}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {item.product.description}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="text-base font-bold text-sport-primary-600">{item.product.price}</div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-sport-primary-600 hover:bg-sport-primary-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transform hover:scale-105 transition text-xs font-medium"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
