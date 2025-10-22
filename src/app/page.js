"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/product");
    } else {
      router.replace("/login");
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center mx-auto">
      <p className="text-2xl font-semibold text-center text-gray-700">Loading...</p>
    </div>
  );
}

