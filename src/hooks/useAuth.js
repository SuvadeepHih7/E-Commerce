import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const registerUser = useMutation({
    mutationFn: (data) => axiosInstance.post("/api/auth/register", data),
  });

  const loginUser = useMutation({
    mutationFn: (data) => axiosInstance.post("/api/auth/login", data),
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }) =>
      axiosInstance.put(`/api/auth/update-user/${id}`, data),
  });

  return { registerUser, loginUser, updateUser };
};

