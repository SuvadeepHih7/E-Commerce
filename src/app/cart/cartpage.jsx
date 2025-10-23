"use client";

import { useCart } from "@/hooks/useCart";
import React from "react";
import { Loader2, Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/utils/currencyFormat";


export default function CartPage() {
  const { cart, isLoading, isError, updateCart, clearCart, isClearing, createOrder, isOrdering } = useCart();

  // Calculate total
  const total = cart?.reduce(
    (sum, item) => sum + item.product.price * item.quentity,
    0
  );

  const shipping = total > 50 ? 0 : 5.99;
  const deliveryCharge = total > 50 ? 0 : 5.99;
  const finalTotal = total + shipping + deliveryCharge;

  // Handle quantity increase
  const handleQuantityIncrease = async (productId) => {
    try {
      await updateCart({ productId, action: "add" });
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  // Handle quantity decrease
  const handleQuantityDecrease = async (productId) => {
    try {
      await updateCart({ productId, action: "sub" });
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (productId) => {
    try {
      await updateCart({ productId, action: "remove" });
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Handle Checkout
  const handleCheckout = async () => {
    try {
      await createOrder();
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
          <Loader2 className="w-12 h-12 text-[#2E8B57] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to load cart</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!cart?.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md border border-gray-200">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty!</h2>
          <p className="text-gray-600 mb-6">Start adding some amazing products to your cart</p>
          <Link href="/product" className="bg-[#2E8B57] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#228B22] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Your Cart ({cart.length} items)</h1>
        </div>

        {/* Cart Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 overflow-hidden">
          {/* Table Header - Hidden on mobile */}
          <div className="bg-gradient-to-r from-[#2E8B57]/10 to-[#3CB371]/10 border-b border-white/30 px-4 lg:px-6 py-4 grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600 lg:grid">
            <div className="col-span-5">Item</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-center">Total</div>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-100/50">
            {cart.map((item) => (
              <div key={item.productId} className="p-4 lg:px-6 lg:py-5">
                {/* Mobile Layout */}
                <div className="lg:hidden space-y-4">
                  {/* Header Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3 flex-1">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-white/50 shadow-sm"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{item.product.name}</h3>
                        <p className="text-lg font-bold text-[#2E8B57] mt-1">${item.product.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="cursor-pointer text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity and Total Row */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 font-medium">Quantity:</span>
                      <div className="flex items-center space-x-2 bg-gray-100/80 rounded-xl p-1">
                        <button
                          onClick={() => handleQuantityDecrease(item.productId)}
                          disabled={item.quentity <= 1}
                          className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-800 text-sm">
                          {item.quentity}
                        </span>
                        <button
                          onClick={() => handleQuantityIncrease(item.productId)}
                          className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-bold text-[#2E8B57]">
                        ${(item.product.price * item.quentity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
                  {/* Item Column */}
                  <div className="col-span-5 flex items-start gap-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-xl border border-white/50 shadow-sm"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{item.product.name}</h3>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="col-span-2 text-center">
                    <span className="text-lg font-bold text-[#2E8B57]">{formatCurrency(item.product.price)}</span>
                  </div>

                  {/* Quantity Column */}
                  <div className="col-span-3 flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleQuantityDecrease(item.productId)}
                      disabled={item.quentity <= 1}
                      className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-white/50 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800">{item.quentity}</span>
                    <button
                      onClick={() => handleQuantityIncrease(item.productId)}
                      className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-white/50 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Total Column */}
                  <div className="col-span-2 flex items-center justify-center space-x-3">
                    <span className="text-lg font-bold text-gray-800">
                      {formatCurrency(item.product.price * item.quentity)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="cursor-pointer text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping Button */}
          <div className="mt-2">
            <Link
              href="/product"
              className="flex items-center justify-center gap-2 cursor-pointer w-full bg-gradient-to-r from-[#2E8B57]/50 to-[#3CB371]/50 text-white py-3 font-semibold text-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

        </div>

        {/* Order Summary */}
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          {/* Right: Promotions & Coupon */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-5">Order Benefits</h3>

            <div className="space-y-4">
              {/* Free Shipping */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2E8B57] flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Free Shipping</span> on orders over $50.
                </p>
              </div>

              {/* Free Delivery */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2E8B57] flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Free Delivery</span> on orders over $50.
                </p>
              </div>

              {/* Fast Shipping */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2E8B57] flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Fastest Delivery</span> — ships within 2 business days.
                </p>
              </div>

              {/* Coupon Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-xl text-gray-600 mb-10">Have a coupon?</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/30 focus:border-[#2E8B57]"
                  />
                  <button className="bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-700 px-4 rounded-lg font-medium transition-colors whitespace-nowrap">
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-10 text-center">
                  Discount will be applied at checkout.
                </p>
              </div>
            </div>
          </div>

          {/* Left: Order Summary */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-gray-600">Delivery Charge:</span>
                <span className="font-medium">{deliveryCharge === 0 ? 'FREE' : `$${deliveryCharge}`}</span>
              </div>

              <div className="border-t border-gray-200 pt-5">
                <div className="flex justify-between text-xl font-semibold">
                  <span className="text-gray-600">Grand Total:</span>
                  <span>{formatCurrency(total + shipping + deliveryCharge)}</span>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex-1">
                  <button
                    onClick={handleCheckout}
                    disabled={isOrdering}
                    className="cursor-pointer w-full bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-70"
                  >
                    {isOrdering ? "Placing Order..." : "Check Out"}
                  </button>
                </div>
                <div className="flex-1">
                  <button
                    onClick={() => clearCart()}
                    disabled={isClearing}
                    className="cursor-pointer w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold text-lg "
                  >
                    {isClearing ? "Clearing..." : "Clear Cart"}
                  </button>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500 mt-10">
                <p> Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}