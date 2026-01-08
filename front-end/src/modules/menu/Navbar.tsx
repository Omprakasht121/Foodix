import { Search, ShoppingCart } from "lucide-react";
// import { motion } from "framer-motion" 
import {motion} from "framer-motion"

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart }) => {
    return(
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
    )
};

export default Navbar;
