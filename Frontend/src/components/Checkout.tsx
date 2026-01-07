import { useEffect, useState } from 'react';
import { CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { DeliveryAddress, OrderItem } from '../types';
import { formatINR } from '../utils/currency';

interface CheckoutProps {
  onSuccess: () => void;
}

export default function Checkout({ onSuccess }: CheckoutProps) {
  const { cart, clearCart, placeOrder } = useStore();
  const { user } = useAuth();
  const isDark = user?.theme === 'dark';

  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: user?.fullName || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = total * 0.1;
  const grandTotal = total + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'razorpay') {
      if (!razorpayReady) {
        alert('Payment is initializing, please wait a moment...');
        return;
      }
      setIsProcessing(true);
      // Create a lightweight client-only Razorpay order (for demo). In production, create via server.
      const options: any = {
        key: 'rzp_test_RRiJ4OoGgRlrpK',
        amount: Math.round(grandTotal * 100),
        currency: 'INR',
        name: 'Sports Hub',
        description: 'Order Payment',
        handler: function (response: any) {
          const orderItems: OrderItem[] = cart.map((item) => ({
            id: Date.now().toString() + Math.random(),
            product: item.product,
            quantity: item.quantity,
            price: item.product.price,
          }));

          placeOrder({
            userId: user!.id,
            totalAmount: grandTotal,
            status: 'paid',
            deliveryAddress: address,
            paymentMethod: 'razorpay',
            items: orderItems,
          });

          clearCart();
          setIsProcessing(false);
          setOrderPlaced(true);
          setTimeout(() => onSuccess(), 1500);
        },
        prefill: {
          name: user?.fullName || 'Customer',
          email: user?.email || 'customer@example.com',
          contact: '9999999999',
        },
        theme: { color: '#ef4444' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function () {
        setIsProcessing(false);
        alert('Payment failed. Please try again.');
      });
      rzp.open();
      return;
    }
    // Fallback non-Razorpay flow
    setIsProcessing(true);
    setTimeout(() => {
      const orderItems: OrderItem[] = cart.map((item) => ({
        id: Date.now().toString() + Math.random(),
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      }));
      placeOrder({
        userId: user!.id,
        totalAmount: grandTotal,
        status: 'pending',
        deliveryAddress: address,
        paymentMethod,
        items: orderItems,
      });
      clearCart();
      setIsProcessing(false);
      setOrderPlaced(true);
      setTimeout(() => onSuccess(), 1500);
    }, 1000);
  };

  useEffect(() => {
    // Dynamically load Razorpay script
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      setRazorpayReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => setRazorpayReady(false);
    document.body.appendChild(script);
  }, []);

  if (orderPlaced) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-md animate-fade-in border border-gray-200">
        <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-600" />
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Order Placed Successfully!</h2>
        <p className="text-gray-600 text-sm mb-4">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <div className="animate-pulse text-sport-primary-600 text-sm">Redirecting to order history...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h2>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-sport-primary-600" />
              <h3 className="text-base font-bold text-gray-900">Payment Method</h3>
            </div>
            <div className="space-y-2">
              {['razorpay', 'cash'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition text-sm ${
                    paymentMethod === method
                      ? 'border-sport-primary-600 bg-sport-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium capitalize text-gray-900">{method === 'razorpay' ? 'Razorpay' : 'Cash on Delivery'}</span>
                </label>
              ))}
              {!razorpayReady && paymentMethod === 'razorpay' && (
                <div className="text-xs text-yellow-600">Initializing Razorpay...</div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-5 shadow-md sticky top-20 space-y-3 border border-gray-200">
            <h3 className="text-base font-bold mb-3 text-gray-900">Order Summary</h3>
            <div className="space-y-2 max-h-56 overflow-y-auto text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-14 h-14 object-cover rounded flex-shrink-0 img-muted" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs text-gray-900 truncate">{item.product.name}</div>
                    <div className="text-xs text-gray-600">
                      Qty: {item.quantity} × {formatINR(item.product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">{formatINR(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold text-gray-900">{formatINR(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span className="text-gray-900">Total</span>
                <span className="text-sport-primary-600">{formatINR(grandTotal)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isProcessing || (paymentMethod === 'razorpay' && !razorpayReady)}
              className="w-full bg-gradient-to-r from-sport-primary-600 to-sport-primary-700 text-white py-2.5 rounded-lg font-semibold hover:from-sport-primary-700 hover:to-sport-primary-800 transform hover:scale-105 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isProcessing ? 'Processing...' : paymentMethod === 'razorpay' ? 'Pay with Razorpay' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
