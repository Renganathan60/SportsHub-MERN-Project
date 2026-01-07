import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';

interface CartProps {
  onCheckout: () => void;
}

export default function Cart({ onCheckout }: CartProps) {
  const { cart, updateCartQuantity, removeFromCart } = useStore();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = total * 0.1;
  const grandTotal = total + tax;

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-md animate-fade-in border border-gray-200">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-lg font-bold mb-2 text-gray-900">Your cart is empty</h2>
        <p className="text-gray-600 text-sm">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Shopping Cart</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition border border-gray-200 flex gap-4"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-28 h-28 object-cover rounded-lg flex-shrink-0 img-muted"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-base text-gray-900">{item.product.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-1">
                  {item.product.description}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 border border-gray-200 rounded-lg w-fit">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-semibold text-xs">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-base font-bold text-sport-primary-600">
                    {formatINR(item.product.price * item.quantity)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-5 shadow-md sticky top-20 space-y-3 border border-gray-200">
            <h3 className="text-base font-bold mb-3 text-gray-900">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">{formatINR(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold text-gray-900">{formatINR(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-sport-primary-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-sport-primary-600">{formatINR(grandTotal)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-sport-primary-600 to-sport-primary-700 text-white py-2.5 rounded-lg font-semibold hover:from-sport-primary-700 hover:to-sport-primary-800 transform hover:scale-105 transition shadow-md text-sm"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
