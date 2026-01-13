import { useMemo, useState } from "react";
import { MENU_ITEMS, CATEGORIES } from "./dataStatic";
import type { CartItem, MenuItem } from "../../types";

import Navbar from "./Navbar";
import CategoryPill from "./CategoryPill";
import FoodCard from "./FoodCard";
import CartDrawer from "./CartDrawer";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Filter, Home, Package2, Search, ShoppingCart, User } from "lucide-react"


const LandingPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [orderMode, setOrderMode] = useState<"restaurant" | "delivery">("restaurant");
  const [foodPreference, setFoodPreference] = useState<"veg" | "nonveg">("veg");


 const subCategories = useMemo(() => {
  if (activeCategory === "all") return [];

  const subs = MENU_ITEMS
    .filter(item => item.category === activeCategory && item.subCategory)
    .map(item => item.subCategory as string);

  return ["all", ...Array.from(new Set(subs))];
}, [activeCategory]);



const filteredItems = useMemo<MenuItem[]>(() => {
  return MENU_ITEMS.filter((item) => {
    // Category
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    // Subcategory
    const matchesSubCategory =
      activeSubCategory === "all" ||
      item.subCategory === activeSubCategory;

    // Veg / Non-Veg
    const matchesFoodType =
      foodPreference === "nonveg" || item.foodType === "veg";

    return matchesCategory && matchesSubCategory && matchesFoodType;
  });
}, [activeCategory, activeSubCategory, foodPreference, searchTerm]);



  const addToCart = (item: MenuItem): void => {
  setCart((prev) => {
    const existing = prev.find((i) => i.id === item.id);
    if (existing) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    return [...prev, { ...item, quantity: 1 }];
  });
};

const updateQuantity = (id: number, delta: number): void => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
  );
};

const removeFromCart = (id: number): void => {
  setCart((prev) => prev.filter((item) => item.id !== id));
};


  return (
    <div>
      {/* FULL LANDING PAGE JSX HERE */}
      <div className="min-h-screen text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-500">
      <Navbar
        cartCount={cart.length}
        toggleCart={() => setIsCartOpen(true)}
        orderMode={orderMode}
        setOrderMode={setOrderMode}
        foodPreference={foodPreference}
        setFoodPreference={setFoodPreference}
      />


      <main className=" container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className=" hidden  relative overflow-hidden rounded-xl bg-gray-900 text-white p-8 md:p-16">
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
        <section className="">
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

        {/* subcatagories  */}
        {activeCategory !== "all" && subCategories.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar ">
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubCategory(sub)}
              className={`px-4 py-1 md:py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeSubCategory === sub
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {sub === "all" ? "All" : sub}
            </button>
          ))}
        </div>
      )}



        {/* Menu Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black">Popular Menu</h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium cursor-pointer hover:text-gray-900">
              <Filter size={18} /> Sort By
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8">
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

      {/* mobile navbar  */}
      <nav className=" fixed flex md:hidden bottom-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-around text-xs">
        <div className="flex flex-col items-center ">
          <Package2 size={24}/>
          <p>orders</p>
        </div>
        <div className=" flex flex-col items-center">
          <button onClick={()=>setSearchTerm("burger")}>
            <Search size={24} />
          </button>
          <p>Search</p>
        </div>
        <div className="flex flex-col items-center  p-1 rounded-full">
          <Home size={28}/>
          <p>Home</p>
        </div>
        <div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-all group"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white"
              >
                {cart.length}
              </motion.span>
            )}
            <p>cart</p>
          </button>
        </div>
        <div className="flex flex-col items-center">
            <User size={24}/>
          <p>Account</p>
        </div>
      </div>
    </nav>

      {/* Footer */}
      <footer className="hidden md:flex bg-gray-900 text-white py-20">
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
    </div>
  );
};

export default LandingPage;
