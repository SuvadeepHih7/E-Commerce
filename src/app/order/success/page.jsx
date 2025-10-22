"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import OrderSuccessPage from "./sucess";

export default function SuccessPage() {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || !token) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return <OrderSuccessPage />;
}