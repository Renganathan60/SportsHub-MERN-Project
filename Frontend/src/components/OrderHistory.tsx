import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

export default function OrderHistory() {
  const { orders } = useStore();
  const { user } = useAuth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'processing':
        return <Package className="w-4 h-4 text-sport-primary-600" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-orange-600" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-sport-primary-50 text-sport-primary-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-md animate-fade-in border border-gray-200">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-lg font-bold mb-2 text-gray-900">No orders yet</h2>
        <p className="text-gray-600 text-sm">Start shopping to see your orders here!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-2 mb-1 text-sm">
                  <span className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-sport-primary-600">${order.totalAmount.toFixed(2)}</div>
                {order.trackingNumber && (
                  <div className="text-xs text-gray-600">
                    Tracking: {order.trackingNumber}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-900">Order Timeline</h4>
                <div className="flex items-center gap-1">
                  {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
                    const isActive = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= index;
                    return (
                      <div key={status} className="flex items-center flex-1">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full transition ${
                            isActive ? 'bg-sport-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {getStatusIcon(status)}
                        </div>
                        {index < 3 && (
                          <div
                            className={`flex-1 h-1 mx-0.5 transition ${
                              isActive ? 'bg-sport-primary-600' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-900">Items</h4>
                <div className="space-y-1.5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-2 text-sm">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded flex-shrink-0 img-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-xs truncate">{item.product.name}</div>
                        <div className="text-xs text-gray-600">
                          Qty: {item.quantity} × ${item.price}
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900">${(item.quantity * item.price).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-sm mb-2 text-gray-900">Delivery Address</h4>
                <div className="text-xs text-gray-700 space-y-0.5">
                  <div>{order.deliveryAddress.fullName}</div>
                  <div>{order.deliveryAddress.phone}</div>
                  <div>{order.deliveryAddress.address}</div>
                  <div>
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                  </div>
                  <div>{order.deliveryAddress.country}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
