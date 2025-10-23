import ProductDetailsModal from "@/components/modal/singleProduct/singleProductModal";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatcurrrency";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const { addToCart, isAdding } = useCart();

  const handleAddToCart = async () => {
    await addToCart({ productId: product._id, quentity: 1 });
  };
  return (
    <>
      <div className="p-4 bg-white/90 backdrop-blur-sm w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-[#2E8B57]/20 group">
        {/* Image Container */}
        <div className="h-76 w-auto overflow-hidden rounded-xl m-4">
          <img
            src={product.imageUrl || "/placeholder-image.jpg"}
            alt={product.name}
            className="w-full h-76 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
          {/* Stock Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${(product.quentity || 0) > 0
              ? 'bg-[#2E8B57] text-white'
              : 'bg-gray-400 text-white'
            }`}>
            {product.quentity > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-0">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#2E8B57] transition-colors duration-200">
            {product.name}
          </h3>

          {/* Price and Quantity */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-[#2E8B57] text-2xl">{formatCurrency(product.price)}</span>
            <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">
              {product.quentity || 0} available
            </span>
          </div>

          <div className="flex gap-4">
            {/* view button*/}
            <button
              onClick={() => setShowModal(true)}
              className={"cursor-pointer w-3/4 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] hover:from-[#228B22] hover:to-[#2E8B57] shadow-lg hover:shadow-xl hover:scale-105 transform"}>
              View Product
            </button>
            <button
              disabled={(product?.quentity || 0) === 0 || isAdding}
              onClick={handleAddToCart}
              className={`w-1/4 py-3 px-4 rounded-xl font-semibold shadow-lg flex items-center justify-center space-x-2 ${(product?.quentity || 0) > 0
                ? 'cursor-pointer bg-white hover:bg-gray-100 text-green-500 hover:text-green-600 hover:shadow-xl border-1 border-green-500 hover:scale-105 transform'
                : 'bg-white text-gray-300 border-1 border-gray-400 cursor-not-allowed'
                }`}>
              {isAdding
                ? "Adding..."
                : <ShoppingCart size={20} />}

            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <ProductDetailsModal
          productId={product._id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}