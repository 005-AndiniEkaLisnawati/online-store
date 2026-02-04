import React from "react";
import ProductCard from "./ProductCard"; // Menggunakan card yang sudah kita upgrade tadi
import { LayoutGrid, PackageSearch } from "lucide-react";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <section className="py-12 bg-gray-50/50 min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header List */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Katalog <span className="text-primary">Produk</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Menampilkan {products.length} produk pilihan
          </p>
        </div>

        {/* Conditional Rendering: Jika Produk Kosong */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <PackageSearch className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Yah, Produk Kosong</h3>
            <p className="text-gray-500 mt-2 text-center max-w-xs">
              Maaf, saat ini belum ada produk yang tersedia. Coba cek kategori lainnya!
            </p>
          </div>
        ) : (
          /* Grid System yang Responsif */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                item={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        )}

        {/* Footer Info (Opsional) */}
        {products.length > 0 && (
          <div className="mt-12 flex justify-center">
            <p className="text-sm text-gray-400 italic">
              ✨ Produk baru ditambahkan setiap hari Senin
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;