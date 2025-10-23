"use client";

import { useProduct } from "@/hooks/useProduct";
import { useState } from "react";
import EditProductModal from "../../components/modal/editProductModal/modal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { formatCurrency } from "@/utils/formatcurrrency";

export default function MyProducts() {
  const { userProducts, userLoading, deleteProduct } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Enhanced delete function with SweetAlert2
const handleDeleteProduct = (productId, productName) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `
        <div class="text-center">
          <p class="text-gray-600 text-lg font-medium">You are about to delete  
          <span class="text-xl font-semibold text-red-500 ">"${productName}"</span></p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2E8B57',
      cancelButtonColor: '#6B7280',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-3xl shadow-2xl border border-gray-100 ',
        confirmButton: 'px-6 py-3 rounded-xl font-semibold text-base bg-red-500 hover:bg-red-600 text-white border-0 mx-2',
        cancelButton: 'px-6 py-3 rounded-xl font-semibold text-base bg-gray-500 hover:bg-gray-600 text-white border-0 mx-2',
        actions: 'gap-4',
        title: 'text-2xl font-bold text-gray-800'
      },
      buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct.mutate(productId, {
          onSuccess: () => {
           toast.success("Product Deleted Successfully!");
          },
          onError: (err) => {
            toast.error("Failed to Delete Product.");
          }
        });
      }
    });
  };

  if (userLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/10 via-white to-[#F5F5F5]/20 p-6 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/40">
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/10 via-white to-[#F5F5F5]/20 p-4 md:p-10">
        <h2 className="text-2xl md:text-4xl font-bold text-[#228B22] mb-4 md:mb-5 text-center">My Products</h2>
        <p className="text-sm md:text-md text-center text-gray-700 px-2">See all the products details which you have added. Now you can update or delete any product if you want.</p>
        <div className="max-w-6xl mt-6 md:mt-8 mx-auto">
        {!userProducts?.length ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-600 text-base md:text-lg bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30 shadow-lg">No products found</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/50 shadow-lg">
            {/* Desktop Table */}
            <table className="w-full hidden md:table">
              <thead className="bg-gradient-to-r from-[#2E8B57]/10 to-[#3CB371]/10 text-gray-700">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Product Image</th>
                  <th className="py-4 px-6 text-left font-semibold">Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Price</th>
                  <th className="py-4 px-6 text-left font-semibold">Quantity</th>
                  <th className="py-4 px-6 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {userProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-green-100 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#2E8B57] text-lg">{formatCurrency(product.price)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {product.quentity} available
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button
                         onClick={() => setSelectedProduct(product)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105"
                      >
                        Edit
                      </button>
                      <button
                         onClick={() => handleDeleteProduct(product._id, product.name)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
              {userProducts.map((product) => (
                <div key={product._id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
                  <div className="flex items-center space-x-4 mb-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                      <p className="font-semibold text-[#2E8B57] text-lg">{formatCurrency(product.price)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-gray-100/80 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {product.quentity} available
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-medium hover:shadow-lg cursor-pointer text-sm transition-all duration-200 hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id, product.name)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-medium hover:shadow-lg cursor-pointer text-sm transition-all duration-200 hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

         {selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )} 
        </div>
      </div>
  );
}