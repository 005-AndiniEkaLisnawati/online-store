import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingCart, CheckCircle2, ReceiptText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from 'qrcode.react';

function CartSidebar({ isOpen, closeCart, cartItems, updateQty, removeItem, clearCart }) {
  const [view, setView] = useState("cart"); // views: 'cart', 'qr', 'struk'

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

  const handlePaymentConfirm = () => {
    setView("struk");
    // Opsional: Panggil clearCart() di sini jika ingin keranjang kosong saat struk muncul
  };

  const handleFinishTransaction = () => {
    clearCart(); // Kosongkan keranjang
    setView("cart"); // Reset view balik ke keranjang
    closeCart(); // Tutup sidebar
  };

  return (
    <>
      {/* Overlay dengan Backdrop Blur */}
      <div
        className={`fixed inset-0 z-100 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={view === "struk" ? handleFinishTransaction : closeCart}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed right-0 top-0 z-101 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          
          {/* Header Dinamis */}
          <div className="flex items-center justify-between border-b px-6 py-5 bg-white shrink-0">
            <div className="flex items-center gap-3">
              {view === "qr" ? (
                <button onClick={() => setView("cart")} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
              ) : (
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
              )}
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-none">
                  {view === "cart" ? "Keranjang" : view === "qr" ? "Pembayaran" : "E-Receipt"}
                </h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1 font-semibold">SMK Store Terminal #01</p>
              </div>
            </div>
            {view !== "struk" && (
              <Button variant="ghost" size="icon" onClick={closeCart} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 scrollbar-none">
            
            {/* VIEW 1: DAFTAR BELANJA */}
            {view === "cart" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                {cartItems.length === 0 ? (
                  <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
                    <div className="rounded-full bg-white shadow-sm p-8">
                      <ShoppingCart className="h-12 w-12 text-gray-200" />
                    </div>
                    <p className="text-gray-400 font-medium text-sm">Belum ada produk dipilih</p>
                    <Button variant="outline" onClick={closeCart} className="rounded-full text-xs">Cari Produk</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="group flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-0.5">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                            <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-primary text-sm">{formatRupiah(item.price)}</p>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border">
                              <button onClick={() => updateQty(item.id, -1)} className="h-5 w-5 flex items-center justify-center bg-white rounded shadow-sm disabled:opacity-30" disabled={item.qty <= 1}>
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, 1)} className="h-5 w-5 flex items-center justify-center bg-white rounded shadow-sm">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: QRIS PAYMENT */}
            {view === "qr" && (
              <div className="flex flex-col items-center justify-center min-h-full space-y-6 text-center animate-in zoom-in-95 duration-300">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 w-full max-w-300px">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-8 mx-auto mb-6" />
                  <div className="p-2 border-2 border-primary/20 rounded-2xl inline-block">
                    <QRCodeCanvas value={`PAY-SMK-${totalPrice}`} size={180} level="H" />
                  </div>
                  <div className="mt-6 pt-4 border-t border-dashed">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Total Pembayaran</p>
                    <p className="text-2xl font-black text-gray-900">{formatRupiah(totalPrice)}</p>
                  </div>
                </div>
                <div className="w-full max-w-75 space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 h-12 rounded-xl text-white font-bold" onClick={handlePaymentConfirm}>
                    Konfirmasi Pembayaran
                  </Button>
                  <p className="text-[10px] text-gray-400 px-4">Pembayaran otomatis terverifikasi setelah dana diterima sistem.</p>
                </div>
              </div>
            )}

            {/* VIEW 3: RECEIPT */}
            {view === "struk" && (
              <div className="animate-in slide-in-from-bottom-10 duration-500 h-full">
                <div className="bg-white shadow-xl rounded-2xl relative overflow-hidden flex flex-col h-full border-t-[6px] border-primary">
                  <div className="p-6 overflow-y-auto flex-1">
                    <div className="text-center mb-8">
                      <div className="inline-flex p-3 bg-green-50 rounded-full mb-3">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="font-black text-xl text-gray-800">TRANSAKSI BERHASIL</h3>
                      <p className="text-[10px] text-gray-400 font-mono mt-1">NO. REF: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                    </div>

                    <div className="space-y-3 font-mono text-xs border-t border-dashed pt-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-start gap-4 text-gray-600">
                          <span className="flex-1">{item.name} <span className="text-gray-400">x{item.qty}</span></span>
                          <span className="font-bold text-gray-800 shrink-0">{formatRupiah(item.price * item.qty)}</span>
                        </div>
                      ))}
                      
                      <div className="border-t border-dashed pt-4 mt-4 space-y-2">
                        <div className="flex justify-between text-gray-400">
                          <span>Metode Pembayaran</span>
                          <span>QRIS Digital</span>
                        </div>
                        <div className="flex justify-between text-base font-black pt-2 text-gray-900">
                          <span>TOTAL</span>
                          <span className="text-primary">{formatRupiah(totalPrice)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 text-center pb-8">
                       <p className="text-xs font-bold text-gray-800">TERIMA KASIH</p>
                       <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Powered by SMK Store System</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t shrink-0">
                    <Button className="w-full h-12 rounded-xl font-bold" onClick={handleFinishTransaction}>
                      Selesai & Tutup
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Transaksi (Hanya muncul di Keranjang) */}
          {view === "cart" && cartItems.length > 0 && (
            <div className="p-6 bg-white border-t shrink-0">
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-black text-primary leading-none">{formatRupiah(totalPrice)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 px-2 py-1 bg-gray-100 rounded-md">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} ITEMS
                  </span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full h-14 text-base font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                onClick={() => setView("qr")}
              >
                Checkout Sekarang
              </Button>
            </div>
          )}

        </div>
      </aside>
    </>
  );
}

export default CartSidebar;