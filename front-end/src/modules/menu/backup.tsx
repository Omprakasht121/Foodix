import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  ChevronRight, 
  Star, 
  Clock, 
  Flame, 
  Plus, 
  Minus,
  X,
  Heart,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data ---
const CATEGORIES = [
  { id: 'all', name: 'All', emoji: '🍽️' },
  { id: 'burgers', name: 'Burgers', emoji: '🍔' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣' },
  { id: 'desserts', name: 'Desserts', emoji: '🍰' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' },
];

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    category: 'burgers',
    price: 12.99,
    rating: 4.8,
    reviews: 124,
    time: '15-20 min',
    calories: '650 kcal',
    description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    category: 'pizza',
    price: 14.50,
    rating: 4.9,
    reviews: 89,
    time: '20-25 min',
    calories: '800 kcal',
    description: 'Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=400',
    popular: false
  },
  {
    id: 3,
    name: 'Dragon Roll Sushi',
    category: 'sushi',
    price: 18.00,
    rating: 4.7,
    reviews: 56,
    time: '25-30 min',
    calories: '450 kcal',
    description: 'Shrimp tempura, eel, avocado, and unagi sauce.',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    price: 8.50,
    rating: 5.0,
    reviews: 210,
    time: '10-15 min',
    calories: '520 kcal',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1624353335558-98e7bb3d9707?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 5,
    name: 'Berry Smoothie',
    category: 'drinks',
    price: 6.99,
    rating: 4.6,
    reviews: 42,
    time: '5 min',
    calories: '180 kcal',
    description: 'Fresh strawberries, blueberries, and raspberries blended with yogurt.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400',
    popular: false
  },
  {
    id: 6,
    name: 'Pepperoni Feast',
    category: 'pizza',
    price: 16.99,
    rating: 4.8,
    reviews: 156,
    time: '20-25 min',
    calories: '950 kcal',
    description: 'Double pepperoni with a blend of three cheeses.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=400',
    popular: true
  }
];

// --- Components ---

const Navbar = ({ cartCount, toggleCart }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          F
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">Foodic</span>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search your favorite food..." 
          className="bg-transparent border-none outline-none px-3 w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors md:hidden">
          <Search size={20} />
        </button>
        <button 
          onClick={toggleCart}
          className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all group"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
        <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden border-2 border-orange-100 cursor-pointer">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
      </div>
    </div>
  </nav>
);

const CategoryPill = ({ category, isActive, onClick }) => (
  <button
    onClick={() => onClick(category.id)}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 ${
      isActive 
        ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 scale-105' 
        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
    }`}
  >
    <span className="text-lg">{category.emoji}</span>
    <span className="font-medium text-sm">{category.name}</span>
  </button>
);

const FoodCard = ({ item, onAddToCart }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -8 }}
    className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
  >
    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] mb-4">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
          <Heart size={18} />
        </button>
        {item.popular && (
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Flame size={12} fill="currentColor" /> Popular
          </div>
        )}
      </div>
    </div>

    <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-orange-500 transition-colors">
        {item.name}
      </h3>
      <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-green-700 font-bold text-xs">
        <Star size={12} fill="currentColor" /> {item.rating}
      </div>
    </div>

    <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
      <div className="flex items-center gap-1">
        <Clock size={14} /> {item.time}
      </div>
      <div className="flex items-center gap-1">
        <Flame size={14} /> {item.calories}
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Price</span>
        <span className="text-xl font-extrabold text-gray-900">${item.price.toFixed(2)}</span>
      </div>
      <button 
        onClick={() => onAddToCart(item)}
        className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all active:scale-90 shadow-lg"
      >
        <Plus size={24} />
      </button>
    </div>
  </motion.div>
);

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQty, onRemove }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  My Cart <span className="text-orange-500">({cartItems.length})</span>
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                      <ShoppingCart size={40} />
                    </div>
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <button 
                      onClick={onClose}
                      className="text-orange-500 font-bold hover:underline"
                    >
                      Start adding some food!
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div 
                      layout 
                      key={item.id} 
                      className="flex gap-4 items-center group"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-xs text-red-500 hover:underline mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-black text-orange-500">${total.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-orange-500 text-white py-4 rounded-[1.5rem] font-bold text-lg shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-95 transition-all">
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main App ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Visual feedback would go here
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-500">
      <Navbar cartCount={cart.length} toggleCart={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 relative overflow-hidden rounded-[3rem] bg-gray-900 text-white p-8 md:p-16">
          <div className="relative z-10 md:w-2/3">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-sm font-bold mb-6"
            >
              🎉 Special Promotion
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]"
            >
              Order Your <br />
              <span className="text-orange-500 underline decoration-4 underline-offset-8">Favorite Food</span> <br />
              Easily & Fast.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg mb-8 max-w-md"
            >
              Experience the best culinary delights delivered to your doorstep. Use code <span className="text-white font-bold">FOODIC25</span> for 25% off.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 group transition-all"
            >
              Order Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute top-[-20%] right-[-10%] w-[60%] aspect-square bg-orange-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] aspect-square bg-white/5 rounded-full blur-[80px]" />
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600" 
            className="absolute right-[-10%] bottom-[-10%] w-[50%] h-[120%] object-cover opacity-20 hidden md:block"
            alt=""
          />
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black">Categories</h2>
            <button className="text-orange-500 font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
            {CATEGORIES.map(cat => (
              <CategoryPill 
                key={cat.id} 
                category={cat} 
                isActive={activeCategory === cat.id}
                onClick={setActiveCategory}
              />
            ))}
          </div>
        </section>

        {/* Menu Grid */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black">Popular Menu</h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium cursor-pointer hover:text-gray-900">
              <Filter size={18} /> Sort By
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredItems.map(item => (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  onAddToCart={addToCart} 
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No dishes found in this category.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">F</div>
              <span className="text-2xl font-bold tracking-tight">Foodic</span>
            </div>
            <p className="text-gray-400">Discover the best food from over 1,000 restaurants and get it delivered in minutes.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Restaurants</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe for latest deals and news.</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex-1 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="bg-orange-500 p-2 rounded-xl hover:bg-orange-600 transition-colors">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          © 2024 Foodic Delivery. All rights reserved.
        </div>
      </footer>

      {/* Modals & Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}