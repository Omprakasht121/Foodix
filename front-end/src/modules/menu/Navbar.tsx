import { Search, ShoppingCart } from "lucide-react";
// import { motion } from "framer-motion" 
import {motion} from "framer-motion"

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;

  orderMode: "restaurant" | "delivery";
  setOrderMode: (mode: "restaurant" | "delivery") => void;

  foodPreference: "veg" | "nonveg";
  setFoodPreference: (mode: "veg" | "nonveg") => void;
}


const Navbar: React.FC<NavbarProps> = ({cartCount, toggleCart, orderMode, setOrderMode, foodPreference, setFoodPreference}) => {
    return(
      <nav className="hidden md:flex sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between bg-green-500">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            
            <p>F</p>
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
          {/* Order Mode Toggle */}
          <div className="flex rounded-full border overflow-hidden text-sm">
            <button
              onClick={() => setOrderMode("restaurant")}
              className={`px-3 py-1 ${
                orderMode === "restaurant"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Restaurant
            </button>
            <button
              onClick={() => setOrderMode("delivery")}
              className={`px-3 py-1 ${
                orderMode === "delivery"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Delivery
            </button>
          </div>

          {/* Veg / Non-Veg Toggle */}
          <div className="flex rounded-full border overflow-hidden text-sm ml-3">
            <button
              onClick={() => setFoodPreference("veg")}
              className={`px-3 py-1 ${
                foodPreference === "veg"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Veg
            </button>
            <button
              onClick={() => setFoodPreference("nonveg")}
              className={`px-3 py-1 ${
                foodPreference === "nonveg"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Non-Veg
            </button>
          </div>

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
    )
};

export default Navbar;
