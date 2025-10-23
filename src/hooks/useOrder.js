"use client";

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useUserOrder = (page = 1, limit = 10) => {
  const fetchOrders = async () => {
    const res = await axiosInstance.get(`/api/order?page=${page}&limit=${limit}`);
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", page],
    queryFn: fetchOrders,
    keepPreviousData: true,
  });

  return {
    orders: data?.orders || [],
    totalPages: data?.totalPages || 1,
    currentPage: data?.page || 1,
    isLoading,
    isError,
    error,
  };
};
