import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { Loader2, Sparkles } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://6982bcad9c3efeb892a3254c.mockapi.io/products";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error ambil data:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, {...product, qty: 1}];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return {...item, qty: Math.max(1, item.qty + amount)};
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Tetap Transparan & Blur */}
      <Header 
        cartCount={cart.reduce((a, c) => a + c.qty, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        closeCart={() => setIsCartOpen(false)} 
        cartItems={cart} 
        updateQty={updateQty} 
        removeItem={removeItem} 
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-12 pt-16 lg:pt-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6 animate-bounce">
              <Sparkles className="h-4 w-4" />
              <span>Koleksi Terbaru 2026</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
              Temukan Produk Terbaik di <span className="text-primary italic">SMK Store</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600">
              Platform belanja online resmi untuk mendapatkan barang berkualitas dengan harga pelajar. 
              Cepat, mudah, dan terpercaya.
            </p>
          </div>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">Menyiapkan katalog spesial untukmu...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <ProductList products={products} onAddToCart={addToCart} />
          </div>
        )}
      </main>

      {/* Footer Sederhana */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            © 2026 SMK Store. Made with ❤️ for education.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;