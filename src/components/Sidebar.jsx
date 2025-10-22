// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   User,
//   Plus,
//   Package,
//   ShoppingCart,
//   ChevronLeft,
//   ChevronRight,
//   X
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useCart } from "@/hooks/useCart"; // ✅ import your custom cart hook

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // ✅ Cart hook
//   const { cart, isLoading, isError } = useCart();
//   const cartCount = cart?.reduce((acc, item) => acc + item.quentity, 0) || 0;

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setIsMobileOpen(false);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const menuItems = [
//     { href: "/home", label: "Profile", icon: User },
//     { href: "/home/add", label: "Add Product", icon: Plus },
//     { href: "/home/by-user", label: "My Products", icon: Package },
//     { href: "/home/cart", label: "Your Cart", icon: ShoppingCart },
//   ];

//   const isActive = (href) => {
//     if (href === "/home") return pathname === "/home";
//     return pathname.startsWith(href);
//   };

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setIsMobileOpen(!isMobileOpen);
//     } else {
//       setIsCollapsed(!isCollapsed);
//     }
//   };

//   const closeMobileSidebar = () => setIsMobileOpen(false);

//   // ✅ Badge component for cart
//   const CartBadge = ({ count }) => {
//     if (!count) return null;
//     return (
//       <span className="
//         absolute -top-3 -right-1 bg-red-500 text-white text-xs 
//         rounded-full w-5 h-5 flex items-center justify-center font-semibold
//         shadow-md
//       ">
//         {count}
//       </span>
//     );
//   };

//   // ---------- Mobile Sidebar ----------
//   if (isMobile) {
//     return (
//       <>
//         <button
//           onClick={toggleSidebar}
//           className="fixed top-20 left-2 z-50 w-8 h-8 bg-[#2E8B57]/50 bg-backdrop-blur text-white rounded-lg shadow-2xl flex items-center justify-center md:hidden"
//         >
//           <ChevronRight size={24} />
//         </button>

//         {isMobileOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
//             onClick={closeMobileSidebar}
//           />
//         )}

//         <div className={`
//           fixed top-0 left-0 h-full bg-white/95 backdrop-blur-lg shadow-2xl z-50
//           transform transition-transform duration-300 ease-in-out md:hidden
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
//           w-80
//         `}>
//           <div className="p-6 border-b border-white/30 flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-[#228B22]">Menu</h2>
//             <button
//               onClick={closeMobileSidebar}
//               className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2E8B57]/10 text-[#2E8B57] hover:bg-[#2E8B57]/20 transition-colors"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <nav className="p-4 space-y-2">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const active = isActive(item.href);
//               const isCart = item.href === "/home/cart";

//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   onClick={closeMobileSidebar}
//                   className={`relative flex items-center rounded-xl p-4 transition-all duration-200 group ${active
//                       ? 'bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white shadow-lg'
//                       : 'text-gray-600 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57]'
//                     }`}
//                 >
//                   <div className="relative">
//                     <Icon size={24} className="flex-shrink-0 mr-4" />
//                     {isCart && <CartBadge count={cartCount} />}
//                   </div>
//                   <span className="font-medium text-lg">{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#2E8B57]/70 to-[#3CB371]/70 text-white shadow-inner shadow-[#2E8B57]/30">
//             <div className="p-5 flex flex-col items-center justify-center space-y-2">
//               <div className="flex items-center space-x-2">
//                 <h3 className="font-semibold text-lg tracking-wide">Shopify Hub</h3>
//               </div>
//               <p className="text-xs text-white text-center leading-snug">
//                 Grow your business — manage products & track sales easily.
//               </p>
//             </div>
//           </div>

//         </div>
//       </>
//     );
//   }

//   // ---------- Desktop Sidebar ----------
//   return (
//     <div className={`
//       bg-white/90 backdrop-blur-lg shadow-2xl shadow-[#2E8B57]/20 
//       transition-all duration-300 h-screen sticky top-0
//       ${isCollapsed ? 'w-20' : 'w-64'}
//       hidden md:block
//     `}>
//       <div className="p-6 border-b border-white/30">
//         <div className="flex items-center justify-between">
//           {!isCollapsed && (
//             <h2 className="text-2xl font-bold text-[#228B22]">Menu</h2>
//           )}
//           <button
//             onClick={toggleSidebar}
//             className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-lg bg-[#2E8B57]/10 text-[#2E8B57] hover:bg-[#2E8B57]/20 transition-colors"
//           >
//             {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//           </button>
//         </div>
//       </div>

//       <nav className="p-4 space-y-5">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const active = isActive(item.href);
//           const isCart = item.href === "/home/cart";

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`relative flex items-center rounded-xl p-3 transition-all duration-200 group ${active
//                   ? 'bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white shadow-lg'
//                   : 'text-gray-600 hover:bg-[#2E8B57]/10 hover:text-[#2E8B57]'
//                 } ${isCollapsed ? 'justify-center' : ''}`}
//             >
//               <div className="relative">
//                 <Icon
//                   size={20}
//                   className={`flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`}
//                 />
//                 {isCart && <CartBadge count={cartCount} />}
//               </div>
//               {!isCollapsed && (
//                 <span className="font-medium">{item.label}</span>
//               )}

//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-5 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
//                   {item.label}
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {!isCollapsed && (
//         <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#2E8B57]/70 to-[#3CB371]/70 text-white">
//           <div className="p-5 flex flex-col items-center justify-center space-y-2">
//             <div className="flex items-center space-x-2">
//               <h3 className="font-semibold text-lg tracking-wide">GreenCart Hub</h3>
//             </div>
//             <p className="text-xs text-white text-center leading-snug">
//               Grow your business — manage products & track sales easily.
//             </p>
//           </div>
//         </div>

//       )}
//     </div>
//   );
// }
