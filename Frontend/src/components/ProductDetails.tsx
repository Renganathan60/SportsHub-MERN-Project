import { useState } from 'react';
import { X, Star, ShoppingCart, Heart, ThumbsUp } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const { addToCart, addToWishlist, isInWishlist, getProductReviews, addReview } = useStore();
  const { user } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const reviews = getProductReviews(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleWishlist = () => {
    addToWishlist(product);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      addReview({
        productId: product.id,
        userId: user.id,
        userName: user.fullName,
        rating,
        comment,
      });
      setComment('');
      setRating(5);
      setShowReviewForm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b bg-white border-slate-200 rounded-t-2xl sm:rounded-t-3xl">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-slate-100 transition-all duration-300"
          >
            <X className="w-5 h-5 sm:w-6 h-6 text-slate-700" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 sm:h-80 object-cover rounded-xl sm:rounded-2xl shadow-lg border border-slate-200"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{product.name}</h1>

              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 sm:w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                  ))}
                  <span className="font-semibold text-slate-900">{product.rating}</span>
                </div>
                <span className="text-slate-600">({product.reviewCount} reviews)</span>
              </div>

              {/* Updated Pricing Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg sm:text-xl lg:text-2xl text-slate-700 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <span className="text-sm sm:text-base text-green-700 font-semibold">Medium Price Range</span>
              </div>

              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">{product.description}</p>

              <div className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl space-y-3 text-sm sm:text-base border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-700 font-medium">Availability</span>
                  <span className="font-semibold text-sport-primary-600">{product.stock} in stock</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 font-medium">Type</span>
                  <span className="font-semibold capitalize text-slate-900">{product.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 font-medium">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-sport-primary-600 to-sport-primary-500 text-white py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold hover:from-sport-primary-700 hover:to-sport-primary-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-md text-sm sm:text-base ${
                    inWishlist
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-slate-200 text-slate-700 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Customer Reviews</h3>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-sport-primary-600 hover:bg-sport-primary-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base"
              >
                Write a Review
              </button>
            </div>

            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-6 border border-slate-200">
                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-sm sm:text-base text-slate-900">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-yellow-500 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 sm:w-7 h-7 ${star <= rating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-sm sm:text-base text-slate-900">Your Review</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-sport-primary-500 focus:border-sport-primary-500 text-sm sm:text-base text-slate-900 transition-all duration-300"
                    rows={3}
                    placeholder="Share your thoughts about this product..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-sport-primary-600 hover:bg-sport-primary-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base"
                >
                  Submit Review
                </button>
              </form>
            )}

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center py-8 text-slate-600 text-sm sm:text-base">
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3 text-sm sm:text-base">
                      <div>
                        <div className="font-semibold text-slate-900">{review.userName}</div>
                        <div className="text-xs sm:text-sm text-slate-600">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 sm:w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-800 text-sm sm:text-base font-medium">{review.comment}</p>
                    <button className="mt-3 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors text-xs sm:text-sm">
                      <ThumbsUp className="w-3 h-3 sm:w-4 h-4" />
                      <span>Helpful</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
