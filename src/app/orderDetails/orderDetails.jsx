"use client";
import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useUserOrder } from "@/hooks/useOrder";
import { formatCurrency } from "@/utils/currencyFormat";


export default function OrderPage() {
    const [page, setPage] = useState(1);
    const { orders, totalPages, isLoading } = useUserOrder(page);
    const [expanded, setExpanded] = useState(null);

    if (isLoading) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
            <p className="text-lg font-medium text-gray-600 text-center">Loading your orders...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#2E8B57] mb-3 md:mb-4 drop-shadow-sm">My Orders</h2>
                    <p className="text-gray-600 text-sm md:text-lg">Track and manage your purchases</p>
                </div>

                {/* Orders Card */}
                <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl md:rounded-3xl border border-white/60 overflow-hidden">
                    {/* Table Header - Hidden on mobile */}
                    <div className="hidden md:block bg-gradient-to-r from-[#2E8B57]/10 to-[#2E8B57]/5 border-b border-gray-200/60 px-4 md:px-8 py-4 md:py-6">
                        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-[#2E8B57] uppercase tracking-wide">
                            <div className="col-span-3">Order ID</div>
                            <div className="col-span-2 text-center">Total Amount</div>
                            <div className="col-span-2 text-center">Items</div>
                            <div className="col-span-3">Order Date</div>
                            <div className="col-span-2 text-center">Actions</div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="divide-y divide-gray-200/50">
                        {orders.map((order, idx) => (
                            <div key={order.orderId} className="group hover:bg-white/50 transition-all duration-300">
                                {/* Order Row */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-8 md:py-6">
                                    {/* Mobile Layout */}
                                    <div className="md:hidden space-y-3">
                                        {/* Order ID and Date */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-[#2E8B57] rounded-full"></div>
                                                <span className="text-sm font-semibold text-gray-700">
                                                    #{order.orderId}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500 bg-gray-100/80 rounded-full px-2 py-1">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        {/* Amount and Quantity */}
                                        <div className="flex justify-between items-center">
                                            <div className="text-left">
                                                <div className="text-lg font-bold text-[#2E8B57]">{formatCurrency(order.totalAmount)}</div>
                                                <div className="text-xs text-gray-500">Total</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="bg-gray-100/80 rounded-full px-3 py-1">
                                                    <span className="text-sm font-semibold text-gray-700">{order.totalQuantity} items</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex justify-center pt-2">
                                            <button
                                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                                className="w-full bg-white/90 backdrop-blur-sm border border-gray-300/50 hover:border-[#2E8B57]/30 hover:bg-[#2E8B57]/10 rounded-xl px-4 py-2 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
                                            >
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#2E8B57]">
                                                    {expanded === idx ? 'Hide Details' : 'View Details'}
                                                </span>
                                                {expanded === idx ? (
                                                    <ChevronUp className="w-4 h-4 text-[#2E8B57]" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#2E8B57]" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Desktop Layout */}
                                    <div className="hidden md:grid md:col-span-12 grid-cols-12 gap-4 items-center">
                                        <div className="col-span-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-[#2E8B57] rounded-full"></div>
                                                <span className="text-gray-700 tracking-wide">
                                                    #{order.orderId}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-span-2 text-center">
                                            <span className="text-xl font-semibold text-[#2E8B57]">{formatCurrency(order.totalAmount)}</span>
                                        </div>

                                        <div className="col-span-2 text-center">
                                            <div className="bg-gray-100/80 rounded-full px-4 py-2 inline-block">
                                                <span className="font-semibold text-gray-700">{order.totalQuantity} items</span>
                                            </div>
                                        </div>

                                        <div className="col-span-3">
                                            <div className="flex items-center space-x-2 text-gray-600">
                                                <span className="font-medium">
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-span-2 text-center">
                                            <button
                                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                                className="group bg-white/90 backdrop-blur-sm border border-gray-300/50 hover:border-[#2E8B57]/30 hover:bg-[#2E8B57]/10 rounded-2xl px-6 py-3 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 mx-auto"
                                            >
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-[#2E8B57]">
                                                    {expanded === idx ? 'Hide Details' : 'View Details'}
                                                </span>
                                                {expanded === idx ? (
                                                    <ChevronUp className="w-4 h-4 text-[#2E8B57]" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#2E8B57]" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Product Details */}
                                {expanded === idx && (
                                    <div className="bg-gradient-to-br from-gray-50/80 to-green-50/80 border-t border-gray-200/50 px-4 md:px-8 py-6 md:py-8">
                                        <div className="max-w-2xl mx-auto">
                                            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6 flex items-center">
                                                <div className="w-1.5 h-1.5 bg-[#2E8B57] rounded-full mr-3"></div>
                                                Order Items ({order.products.length})
                                            </h3>

                                            <div className="grid gap-3 md:gap-4">
                                                {order.products.map((p) => (
                                                    <div
                                                        key={p._id}
                                                        className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-200/60 p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 group/item"
                                                    >
                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                                                            {/* Product Image */}
                                                            <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
                                                                <div className="relative">
                                                                    <img
                                                                        src={p.image}
                                                                        alt={p.name}
                                                                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-lg md:rounded-xl group-hover/item:border-[#2E8B57]/30 transition-colors duration-300"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Product Info */}
                                                            <div className="flex-grow text-center sm:text-left w-full">
                                                                <h4 className="font-semibold text-gray-800 text-base md:text-lg mb-2 group-hover/item:text-[#2E8B57] transition-colors duration-300 line-clamp-2">
                                                                    {p.name}
                                                                </h4>
                                                                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                                                    <span className="bg-gray-100/80 rounded-full px-3 py-1 text-sm">
                                                                        Qty: {p.quentity}
                                                                    </span>
                                                                    <span className="bg-[#2E8B57]/10 text-[#2E8B57] rounded-full px-3 py-1 text-sm font-medium">
                                                                        {formatCurrency(p.price)} each
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Price - Hidden on mobile, shown on tablet+ */}
                                                            <div className="hidden sm:block text-right min-w-[200px] ">
                                                                <div className="text-xl md:text-2xl font-semibold text-[#2E8B57]">
                                                                   {formatCurrency(p.price * p.quentity)}
                                                                </div>
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                   {formatCurrency(p.price)} × {p.quentity} 
                                                                </div>
                                                            </div>

                                                            {/* Mobile Price */}
                                                            <div className="sm:hidden w-full text-center">
                                                                <div className="bg-[#2E8B57]/5 rounded-xl p-3">
                                                                    <div className="text-lg font-bold text-[#2E8B57]">
                                                                        ${(p.price * p.quentity).toFixed(2)}
                                                                    </div>
                                                                    <div className="text-xs text-gray-600">
                                                                        Total for {p.quentity} item{p.quentity > 1 ? 's' : ''}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-row justify-center items-center gap-3 sm:gap-6 mt-8 md:mt-12">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-300/50 hover:border-[#2E8B57]/30 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-3 transition-all duration-300 shadow-sm hover:shadow-md group flex-1 sm:flex-none min-w-[100px]"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-[#2E8B57] transition-colors" />
                        <span className="font-medium text-gray-700 group-hover:text-[#2E8B57] transition-colors text-sm md:text-base hidden sm:inline">
                            Previous
                        </span>
                    </button>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 py-2 md:px-8 md:py-3 shadow-sm border border-gray-300/50 flex-shrink-0">
                        <span className="font-semibold text-gray-700 text-sm md:text-base">
                            Page <span className="text-[#2E8B57]">{page}</span> of {totalPages}
                        </span>
                    </div>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-300/50 hover:border-[#2E8B57]/30 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-3 transition-all duration-300 shadow-sm hover:shadow-md group flex-1 sm:flex-none min-w-[100px]"
                    >
                        <span className="font-medium text-gray-700 group-hover:text-[#2E8B57] transition-colors text-sm md:text-base hidden sm:inline">
                            Next
                        </span>
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-[#2E8B57] transition-colors" />
                    </button>
                </div>
                {/* Empty State */}
                {orders.length === 0 && (
                    <div className="text-center py-12 md:py-16">
                        <div className="bg-white/70 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl border border-white/50 max-w-sm md:max-w-md mx-auto">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100/80 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <div className="text-2xl md:text-4xl">📦</div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 md:mb-3">No orders yet</h3>
                            <p className="text-gray-500 text-sm md:text-base mb-4 md:mb-6">Your order history will appear here</p>
                            <button className="bg-[#2E8B57] text-white px-6 py-2 md:px-8 md:py-3 rounded-xl md:rounded-2xl font-semibold hover:bg-[#26734d] transition-colors duration-300 shadow-lg hover:shadow-xl w-full md:w-auto">
                                Start Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}