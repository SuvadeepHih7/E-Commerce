"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function AddProductPage() {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || !token) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return <ProductForm />;
}
