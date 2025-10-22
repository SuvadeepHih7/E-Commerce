"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { products, isLoading, isError, error } = useProduct();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  if (isLoading) return (
    <div className="min-h-screen bg-transparent p-10 flex items-center justify-center">
      <h1 className="text-2xl text-gray-600 font-semibold text-center">Loading...</h1>
    </div>
  );
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching products: {error?.message}
      </p>
    );

  return (
   <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/8 to-[#F5F5F5]/20 p-10">
    <h1 className="text-4xl font-bold text-[#228B22] mb-10 text-center">All Products</h1>

    {products?.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-gray-600 text-xlg bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">No products found.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    )}
  </div>
  );
}
