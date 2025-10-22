"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useProduct = () => {
  const queryClient = useQueryClient();

  // Fetch all products
  const fetchProducts = async () => {
    const res = await axiosInstance.get("/api/product"); 
    return res.data.data;
  };

  // Fetch products added by the logged-in user
  const fetchUserProducts = async () => {
    const res = await axiosInstance.get("/api/product/by-user"); 
    return res.data.myProducts || [];
  };

  // React Query: all products
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // React Query: user products
  const {
    data: userProducts,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["userProducts"],
    queryFn: fetchUserProducts,
  });

  // Add new product
  const addProduct = useMutation({
    mutationFn: (data) =>
      axiosInstance.post("/api/product/add", data, {
        headers: { "Content-Type": "multipart/form-data" }, // For file upload
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["userProducts"]);
    },
  });

  // 🔹 Update product
  const updateProduct = useMutation({
    mutationFn: ({ id, data }) =>
      axiosInstance.put(`/api/product/update/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries(["userProducts"]),
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/api/product/delete/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["userProducts"]),
  });

  // Fetch single product by ID
  const fetchSingleProduct = async (id) => {
    const res = await axiosInstance.get(`/api/product/single/${id}`); 
    return res.data.data;
  };

  return {
    products,
    userProducts,
    isLoading,
    isError,
    userLoading,
    userError,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchSingleProduct,
  };
};




