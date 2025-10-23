"use client";

import { useCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProduct";
import { formatCurrency } from "@/utils/currencyFormat";

import { useQuery } from "@tanstack/react-query";

export default function ProductDetailsModal({ productId, onClose }) {
  const { fetchSingleProduct } = useProduct();
  const { addToCart, isAdding } = useCart();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchSingleProduct(productId),
    enabled: !!productId,
  });

  if (!productId) return null;

  const handleAddToCart = async () => {
    await addToCart({ productId, quentity: 1 });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 md:p-5">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl border border-white/40 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#2E8B57]/20 to-[#3CB371]/20 p-6 md:p-8 rounded-t-3xl border-b border-white/30">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#228B22]">Product Details</h2>
            <button
              onClick={onClose}
              className="cursor-pointer w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 md:p-12 text-center text-gray-500 bg-white/50 backdrop-blur-sm m-4 md:m-6 rounded-2xl">
            <div className="animate-pulse">Loading product details...</div>
          </div>
        ) : (
          <div className="p-6 md:p-10 bg-white">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              {/* Left Side - Image */}
              <div className="flex-1 flex items-center justify-center">
                <div className="md:w-full h-36 w-auto md:h-96 p-2 md:p-3 overflow-hidden">
                  <img
                    src={product?.imageUrl || "/placeholder-image.jpg"}
                    alt={product?.name}
                    className="w-full h-full object-cover rounded-xl shadow-lg shadow-[#2E8B57]/40"
                  />
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="flex-1 space-y-4 md:space-y-6">
                {/* Product Name */}
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2 text-center md:text-start">{product?.name}</h3>
                </div>

                {/* Price */}
                <div className="flex flex-col md:flex-row md:items-baseline space-x-3 space-y-2 items-center">
                  <span className="text-2xl md:text-3xl font-semibold text-[#2E8B57]">{formatCurrency(product?.price)}</span>
                  <span className="text-sm md:text-md text-gray-400 line-through">  {formatCurrency((product?.price * 1.15).toFixed(2))}</span>
                  <span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-sm font-semibold">
                    15% OFF
                  </span>
                </div>

                {/* Quantity & Stock Status */}
                <div className="space-y-3 md:space-y-5">
                  <div className="flex justify-between items-center bg-gray-100/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/50">
                    <span className="text-gray-700 font-medium text-sm md:text-lg">Available Quantity:</span>
                    <span className="text-sm md:text-lg font-bold text-[#2E8B57]">{product?.quentity || 0} units</span>
                  </div>

                  <div className={`flex items-center space-x-2 p-2 sm:p-3 rounded-xl ${(product?.quentity || 0) > 0
                      ? 'bg-green-100/80 text-green-700'
                      : 'bg-red-100/80 text-red-700'
                    } backdrop-blur-sm border border-white/50`}>
                    <span className="font-semibold text-xs md:text-base mx-auto text-center">
                      {(product?.quentity || 0) > 0
                        ? 'This product is in stock and ready to ship!'
                        : 'This product is currently out of stock'
                      }
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                {!isLoading && (
                  <div className="p-2 md:p-10 bg-white">
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-5">
                      {/* ...image and details... */}

                      {/* Add to Cart Button */}
                      <button
                        disabled={(product?.quentity || 0) === 0 || isAdding}
                        onClick={handleAddToCart}
                        className={`w-full mt-2 py-2 sm:py-3 rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 shadow-lg ${(product?.quentity || 0) > 0
                            ? 'cursor-pointer bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white hover:from-[#228B22] hover:to-[#2E8B57] hover:shadow-xl'
                            : 'bg-gray-400 text-white cursor-not-allowed'
                          }`}
                      >
                        {isAdding
                          ? "Adding..."
                          : (product?.quentity || 0) > 0
                            ? "Add to Cart"
                            : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Section - Discount Text */}
        <div className="bg-gradient-to-r from-[#2E8B57]/10 to-[#3CB371]/10 p-4 sm:p-6 rounded-b-3xl border-t border-white/30 text-center">
          <p className="text-gray-600 text-sm md:text-lg font-medium">
            Special Offer: <span className="text-[#2E8B57] font-bold">Free shipping</span> on orders above $50!
            <span className="text-amber-600 font-semibold ml-1 sm:ml-2">Limited time only</span>
          </p>
          <p className="text-gray-500 text-xs md:text-sm mt-1 sm:mt-2">
            Secure payment • Fast delivery • Quality guarantee
          </p>
        </div>
      </div>
    </div>
  );
}

