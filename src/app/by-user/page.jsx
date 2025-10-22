"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import MyProducts from "./myProducts";

export default function UserProductPage() {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || !token) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return <MyProducts />;
}