import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <h1 className="text-6xl font-bold text-[#2E8B57] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/product"
        className="flex items-center gap-2 bg-[#2E8B57] text-white px-6 py-3 rounded-lg hover:bg-[#228B22] transition"
      >
        <Home className="w-5 h-5" />
        Go Home
      </Link>
    </div>
  );
}
