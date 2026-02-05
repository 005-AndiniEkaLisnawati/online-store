import React from "react";
import { ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function Header({ cartCount, onOpenCart }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
            <Zap className="h-6 w-6 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black leading-tight tracking-tighter text-gray-900">
              SMK <span className="text-primary">STORE</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
              Future Tech
            </span>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="group relative flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 active:scale-95"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-700 transition-colors group-hover:text-primary" />
              
              {/* Badge Keranjang dengan Animasi Pulse jika ada isinya */}
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 animate-in zoom-in duration-300 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </div>
            
            <span className="hidden sm:block text-sm font-semibold text-gray-700 group-hover:text-primary">
              Keranjang
            </span>

            {/* Efek Glow Tipis saat Hover */}
            <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-md transition-opacity group-hover:opacity-40" />
          </button>

          <div className="hidden sm:block h-8 w-px bg-gray-200" />
       
        </div>
      </div>
    </nav>
  );
}

export default Header;