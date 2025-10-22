"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const useCart = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch Cart Items
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/api/cart");
      console.log(res.data.cart.products);
      return res.data.cart.products || [];
    } catch (error) {
      return null;
    }
  };

  const {
    data: cart,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  // Add to Cart
  const { mutateAsync: addToCart, isPending: isAdding } = useMutation({
    mutationFn: async ({ productId, quentity }) => {
      if (!productId || !quentity) throw new Error("Invalid product data");
      const res = await axiosInstance.post(
        `/api/cart/add?productId=${productId}&quentity=${quentity}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Product added to cart!");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to add product to cart"
      );
    },
  });

  // Update Cart (Add, Subtract, Remove)
  const { mutateAsync: updateCart, isPending: isUpdating } = useMutation({
    mutationFn: async ({ productId, action }) => {
      if (!productId || !action) throw new Error("Invalid update data");
      
      const res = await axiosInstance.put("/api/cart/update", {
        productId,
        action
      });
      return res.data;
    },
    onSuccess: (data) => {
      let message = "Cart updated successfully!";
      if (data.action === "add") message = "Product Quantity Increased!";
      if (data.action === "sub") message = "Product Quantity Decreased!";
      if (data.action === "remove") message = "Product Removed from Cart!";
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update cart"
      );
    },
  });

  //Clear Cart
  const { mutateAsync: clearCart, isPending: isClearing } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete("/api/cart/clear");
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      return error;
    },
  });

   //Create Order from Cart
  const { mutateAsync: createOrder, isPending: isOrdering } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/api/order/orderFromCart");
      return res.data;
    },
    onSuccess: async (data) => {
     Swal.fire({
       icon: 'success',
       title: 'Yay...Congratulations',
       text: 'Order Placed Successfully'|| data.message,
       showConfirmButton: true,
       timer: 2000
     })
        await clearCart();
      router.push("/order/success");
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to place order' || error.response?.data?.message,
        showConfirmButton: true,
        timer: 2000
      })
    },
  });

  return {
    cart,
    isLoading,
    isError,
    error,
    addToCart,
    isAdding,
    updateCart,
    isUpdating,
    clearCart,
    isClearing,
    createOrder,    
    isOrdering, 
  };
};

