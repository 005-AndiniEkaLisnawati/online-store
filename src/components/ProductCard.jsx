import React from "react";
import { Plus, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ProductCard({ item, onAddToCart }) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400?text=Produk+SMK";
          }}
        />
        
        {/* Floating Category Badge */}
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
            {item.category || "General"}
          </Badge>
        </div>

        {/* Quick Add Overlay (Mobile Friendly) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
           <Button 
            variant="secondary" 
            size="sm" 
            className="w-full gap-2 font-bold shadow-lg"
            onClick={() => onAddToCart(item)}
           >
            <Plus className="h-4 w-4" /> Keranjang
          </Button>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3 w-3 fill-current ${i > 3 ? 'text-gray-300' : ''}`} />
          ))}
          <span className="ml-1 text-[10px] font-medium text-gray-400">(24)</span>
        </div>

        <h3 className="mb-1 text-base font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        
        <p className="mb-4 text-xs leading-relaxed text-gray-500 line-clamp-2">
          {item.desc || "Deskripsi produk berkualitas dari SMK Store untuk menunjang kebutuhanmu."}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase text-gray-400">Harga</span>
            <span className="text-lg font-black tracking-tight text-primary">
              {formatRupiah(item.price)}
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart(item)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-all hover:bg-primary hover:text-white active:scale-90"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;