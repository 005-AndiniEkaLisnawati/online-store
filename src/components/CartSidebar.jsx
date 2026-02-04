import React from "react";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

function CartSidebar({ isOpen, closeCart, cartItems, updateQty, removeItem }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <>
      {/* Overlay: Backdrop blur membuat fokus hanya pada sidebar */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart}
      />

      {/* Sidebar: Slide-in animation */}
      <aside
        className={`fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight">Keranjang</h2>
              {cartItems.length > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={closeCart} className="rounded-full hover:rotate-90 transition-transform duration-200">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* List Items Area */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4 opacity-50">
                <div className="rounded-full bg-secondary p-6">
                  <ShoppingCart className="h-12 w-12 stroke-1" />
                </div>
                <p className="text-lg font-medium">Keranjangmu kosong</p>
                <Button variant="link" onClick={closeCart}>Cari produk menarik</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="group flex gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border bg-secondary/30">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-primary mt-1">{formatRupiah(item.price)}</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-lg border bg-gray-50 p-1">
                          <button 
                            onClick={() => updateQty(item.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all disabled:opacity-30"
                            disabled={item.qty <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-9 text-center text-sm font-bold">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-xs font-medium text-gray-500">
                          Subtotal: <span className="text-gray-800">{formatRupiah(item.price * item.qty)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Section */}
          {cartItems.length > 0 && (
            <div className="border-t bg-gray-50/50 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Ringkasan Belanja</span>
                  <span>{cartItems.length} Produk</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="text-base font-medium text-gray-900">Total Tagihan</span>
                  <span className="text-xl font-black text-primary">{formatRupiah(totalPrice)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Button 
                  size="lg" 
                  className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                  onClick={() => alert("Menuju halaman pembayaran...")}
                >
                  Checkout Sekarang
                </Button>
                <Button variant="ghost" onClick={closeCart} className="text-gray-500 text-xs uppercase tracking-widest font-bold">
                  Kembali Belanja
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default CartSidebar;