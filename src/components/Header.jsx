"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import { 
  User, 
  ShoppingCart, 
  Package, 
  Plus, 
  LogOut,
  ChevronDown,
  Menu,
  X,
  PackageCheck
} from "lucide-react";
import Swal from "sweetalert2";

export default function Header() {
  const { token, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    setIsProfileOpen(false);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      logout();
      router.push("/login");
      toast.success("Logged Out Successfully!");
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#2E8B57] to-[#3CB371] backdrop-blur-2xl shadow-2xl shadow-[#2E8B57]/30 relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-2xl md:text-3xl font-bold text-white cursor-pointer flex items-center gap-2"
            onClick={() => router.push("/")}
          >
            Shopify
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {!token ? (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-white/80 text-lg font-semibold transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-white/20 text-white hover:bg-white/30 text-lg font-semibold transition-colors duration-200 px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                {/* Products Link */}
                <Link
                  href="/product"
                  className="text-white hover:text-white/80 text-lg font-semibold transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2"
                >
                  Products
                </Link>

                 {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="cursor-pointer text-lg flex items-center gap-1 text-white hover:text-white/80 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
                  >
                    <span className="font-semibold">Profile</span>
                    <ChevronDown className={`mt-1 w-5 h-5 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white backdrop-blur-lg rounded-xl shadow-2xl border border-white/40 py-3 z-50">
                      {/* Menu Items */}
                      <Link
                        href="/home"
                        onClick={() => setIsProfileOpen(false)}
                        className="text-lg flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] transition-colors duration-200"
                      >
                        <User className="w-6 h-6" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/by-user"
                        onClick={() => setIsProfileOpen(false)}
                        className="text-lg flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] transition-colors duration-200"
                      >
                        <Package className="w-6 h-6" />
                        <span>My Products</span>
                      </Link>

                      <Link
                        href="/add"
                        onClick={() => setIsProfileOpen(false)}
                        className="text-lg flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] transition-colors duration-200"
                      >
                        <Plus className="w-6 h-6" />
                        <span>Add Product</span>
                      </Link>

                      <div className="border-t border-gray-200 mt-2 "></div>

                      <button
                        onClick={handleLogout}
                        className="text-lg flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full text-left transition-colors duration-200"
                      >
                        <LogOut className="w-6 h-6" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Cart Icon with Badge */}
                <Link
                  href="/cart"
                  className="relative text-white hover:text-white/80 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cart?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>

              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <div className="md:hidden mt-4 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-white/40 p-4 space-y-2 z-50">
            {!token ? (
              <>
                <Link
                  href="/login"
                  className="block text-gray-800 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block text-gray-800 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/product"
                  className="flex items-center gap-3 text-gray-800 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Package className="w-5 h-5" />
                  Products
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center gap-3 text-gray-800 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart {cart?.length > 0 && `(${cart.length})`}
                </Link>

                 <div className="border-t border-gray-200 my-2"></div>

                <Link
                  href="/home"
                  className="flex items-center gap-3 text-gray-800 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <User className="w-5 h-5" />
                  My Profile
                </Link>

                <Link
                  href="/by-user"
                  className="flex items-center gap-3 text-gray-800 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <PackageCheck className="w-5 h-5" />
                  My Products
                </Link>

                <Link
                  href="/add"
                  className="flex items-center gap-3 text-gray-800 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57] text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </Link>

                <div className="border-t border-gray-200 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full text-left text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
}

