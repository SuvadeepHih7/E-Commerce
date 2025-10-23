"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 relative">
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {/* Header with high z-index */}
            <div className="relative z-50">
              <Header />
            </div>
            
            {/* Main content with lower z-index */}
            <main className="relative ">
              {children}
            </main>
          </AuthProvider>
          
          {/* Footer */}
          <footer className="bg-[#2E8B57]/90 backdrop-blur-lg text-white py-5 text-center border-t border-white/20 relative z-10">
            <div className="max-w-6xl mx-auto px-4">
              <p className="text-lg font-medium">&copy; 2023 MyApp. All rights reserved.</p>
            </div>
          </footer>
        </QueryClientProvider>
      </body>
    </html>
  );
}

