"use client";

import { useForm } from "react-hook-form";
import { useProduct } from "@/hooks/useProduct";
import InputField from "@/components/InputField";
import toast from "react-hot-toast";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addProduct } = useProduct();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("quentity", data.quentity);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await addProduct.mutateAsync(formData);
      toast.success("Product Added Successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/10  to-[#F5F5F5]/20 p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/40">
        <div className="flex flex-col lg:flex-row">
          {/* Left Part - Image Section */}
          <div className="relative bg-gradient-to-r from-[#2E8B57] to-[#3CB371] flex-1 p-8 lg:p-12 flex items-center justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            {/* Product Image */}
            <div className="text-center">
              <div className="w-56 h-56 md:w-86 md:h-86 bg-transparent flex items-center justify-center mb-6 mx-auto">
                <img
                  src="/image/add-product.png"
                  alt="Product"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Add Your Products</h3>
              <p className="text-gray-300">Showcase your amazing products to the world</p>
            </div>

            <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/30 rounded-full"></div>
          </div>

          {/* Right Part - Content */}
          <div className="flex-1 flex flex-col">
            {/* Top Section - Heading */}
            <div className="p-8 lg:p-12">
              <h2 className="text-4xl font-bold text-[#228B22] mb-4">Add New Product</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Fill in the details below to add your product to our marketplace.
                Make sure to provide clear images and accurate information for better visibility.
              </p>
            </div>

            {/* Divider */}
            <div className="px-8 lg:px-12">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#2E8B57]/30 to-transparent"></div>
            </div>

            {/* Bottom Section - Form */}
            <div className="p-8 lg:p-12">
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="space-y-6"
              >
                {/* Product Name */}
                <InputField
                  label="Product Name"
                  name="name"
                  register={register}
                  errors={errors}
                  type="text"
                />

                {/* Price */}
                <InputField
                  label="Price"
                  name="price"
                  type="number"
                  register={register}
                  errors={errors}
                />

                {/* Quantity */}
                <InputField
                  label="Quantity"
                  name="quentity"
                  type="number"
                  register={register}
                  errors={errors}
                />

                {/* Product Image */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Product Image
                  </label>
                  <input
                    {...register("image", { required: "Image is required" })}
                    type="file"
                    accept="image/*"
                    className="w-full border border-gray-300 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/50 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2E8B57]/10 file:text-[#2E8B57] hover:file:bg-[#2E8B57]/20"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={addProduct.isPending}
                  className=" mt-8 w-full bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105 transform"
                >
                  {addProduct.isPending ? "Adding Product..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
