"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil } from "lucide-react";
import UpdateUserModal from "@/components/modal/update-modal/updateUserModal";

export default function HomePage() {
  const { user, token } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  if (!token || !user) return null;

  // Generate avatar initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = getInitials(user.name || "User");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/20 via-white to-[#F5F5F5]/30 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-white/85 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">

        <div className="relative bg-gradient-to-r from-[#2E8B57] to-[#3CB371] p-8 text-white text-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>


          <div className="relative mx-auto w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
            {initials}

            {/* Edit button (top-right corner) */}
            <button
              onClick={() => setOpenModal(true)}
              className="cursor-pointer absolute -top-2 -right-2 bg-white/90 text-green-600 p-1.5 rounded-full hover:bg-white shadow-md"
              title="Edit Profile"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          <h1 className="text-4xl font-bold relative z-10">Welcome, {user.name}!</h1>
          <p className="text-white/80 mt-2 text-lg relative z-10">{user.email}</p>


          <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/30 rounded-full"></div>
        </div>

        <div className="p-8 space-y-8">

          <div className="text-center relative z-10">
            <h2 className="text-3xl font-bold text-[#228B22] mb-6">
              Your Personal Product Hub
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">🛍️</span>
                </div>
                <h3 className="font-bold text-[#2E8B57] mb-2">Add Products</h3>
                <p className="text-gray-600 text-sm">
                  Easily list your products with images, descriptions, and pricing
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">📱</span>
                </div>
                <h3 className="font-bold text-[#2E8B57] mb-2">Browse Marketplace</h3>
                <p className="text-gray-600 text-sm">
                  Discover amazing products from other sellers in the community
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">🛒</span>
                </div>
                <h3 className="font-bold text-[#2E8B57] mb-2">Smart Shopping</h3>
                <p className="text-gray-600 text-sm">
                  Add to cart, manage quantities, and checkout seamlessly
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 pt-6 border-t border-white/30">
              <p className="text-gray-600 mb-4">
                Ready to get started? Choose an option below
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cart" className="bg-gradient-to-r from-[#2E8B57] to-[#3CB371] hover:from-[#3CB371] hover:to-[#2E8B57] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl">
                  Add Your First Product
                </Link>
                <Link href="/product" className="bg-white/80 text-[#2E8B57] border border-[#2E8B57]/30 px-6 py-3 rounded-xl font-semibold hover:bg-[#2E8B57]/10 transition-all duration-300">
                  Explore Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="bg-[#2E8B57]/10 backdrop-blur-sm p-4 text-center border-t border-white/20 relative overflow-hidden">
          <p className="text-gray-600 text-sm">
            Don't see what product you added?
            <Link href="/by-user" className="text-[#2E8B57] font-medium ml-1">Discover now →</Link>
          </p>
        </div>
      </div>
      {openModal && (
        <UpdateUserModal user={user} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
}
