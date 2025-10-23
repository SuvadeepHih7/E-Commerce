"use client";

import { useForm } from "react-hook-form";
import { useProduct } from "@/hooks/useProduct";
import toast from "react-hot-toast";
import { useState } from "react"; // Import useState

export default function EditProductModal({ product, onClose }) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      quentity: product.quentity,
    },
  });

  const { updateProduct } = useProduct();
  
  // State to track the new image preview
  const [newImagePreview, setNewImagePreview] = useState(null);
  
  // Watch the image input for changes
  const imageFile = watch("image");

  // Handle image change and create preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewImagePreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("quentity", data.quentity);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await updateProduct.mutateAsync({ id: product._id, data: formData });
      toast.success("Product Updated Successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-xl border border-white/40">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2E8B57]/10 to-[#3CB371]/10 p-4 md:p-6 rounded-t-3xl">
          <h3 className="text-xl md:text-2xl font-bold text-[#228B22] text-center">Edit Product</h3>
          <p className="text-gray-600 mt-2 text-center text-xs md:text-sm">Update the details of your existing product</p>
        </div>

        <div className="px-8 md:px-12 mb-8">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#2E8B57]/50 to-transparent"></div>
        </div>

        {/* Current Image Preview */}
        <div className="p-2 flex justify-center items-center">
          <div className="flex items-center space-x-4">
            <img
              src={newImagePreview || product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <p className="text-sm text-gray-600">
                {newImagePreview ? "New Image Preview" : "Current Image"}
              </p>
              <p className="text-xs text-gray-500">
                {newImagePreview ? "This will replace the current image" : "Upload new image below"}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-3 md:space-y-6">

          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Image</label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/50 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2E8B57]/10 file:text-[#2E8B57] hover:file:bg-[#2E8B57]/20"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
            <input
              {...register("name", { required: "Product name is required" })}
              type="text"
              className="w-full border border-gray-300 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Price</label>
            <input
              {...register("price", { required: "Price is required" })}
              type="number"
              step="0.01"
              className="w-full border border-gray-300 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Quantity</label>
            <input
              {...register("quentity", { required: "Quantity is required" })}
              type="number"
              className="w-full border border-gray-300 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer bg-gray-400/80 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-500/80 transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateProduct.isPending}
              className="cursor-pointer bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white px-6 py-3 rounded-xl font-medium hover:from-[#228B22] hover:to-[#2E8B57] transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed backdrop-blur-sm"
            >
              {updateProduct.isPending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
