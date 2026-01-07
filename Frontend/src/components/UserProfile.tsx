import { User, Mail, Award, Package, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export default function UserProfile() {
  const { user } = useAuth();
  const { orders, wishlist } = useStore();

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">My Profile</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md text-center border border-gray-200">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-sport-primary-600 to-sport-primary-700 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">{user?.fullName}</h3>
          <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-4 text-sm">
            <Mail className="w-3.5 h-3.5" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-yellow-600 bg-yellow-50 py-2.5 rounded-lg border border-yellow-200">
            <Award className="w-4 h-4" />
            <span className="font-bold text-base">{user?.loyaltyPoints} Points</span>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-5 shadow-md text-center border border-gray-200">
              <Package className="w-8 h-8 mx-auto mb-2 text-sport-primary-600" />
              <div className="text-2xl font-bold mb-1 text-gray-900">{totalOrders}</div>
              <div className="text-xs text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md text-center border border-gray-200">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold mb-1 text-gray-900">{wishlist.length}</div>
              <div className="text-xs text-gray-600">Wishlist Items</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md text-center border border-gray-200">
              <Award className="w-8 h-8 mx-auto mb-2 text-sport-primary-600" />
              <div className="text-2xl font-bold mb-1 text-gray-900">${totalSpent.toFixed(0)}</div>
              <div className="text-xs text-gray-600">Total Spent</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
            <h3 className="text-base font-bold mb-4 text-gray-900">Account Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.fullName}
                  readOnly
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-gray-700">
                  Loyalty Points
                </label>
                <input
                  type="text"
                  value={`${user?.loyaltyPoints} points`}
                  readOnly
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sport-primary-50 to-sport-primary-100 rounded-xl p-5 shadow-md border border-sport-primary-200">
            <h3 className="text-base font-bold mb-3 text-gray-900">Member Benefits</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sport-primary-600 flex-shrink-0" />
                Earn 10 points for every dollar spent
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sport-primary-600 flex-shrink-0" />
                Free shipping on all orders
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sport-primary-600 flex-shrink-0" />
                Exclusive access to new products
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sport-primary-600 flex-shrink-0" />
                Special birthday discounts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
