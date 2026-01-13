import { Search, ShoppingCart, X } from "lucide-react";
// import { motion } from "framer-motion" 
import {motion} from "framer-motion"

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;

  mobileSearch : boolean;
  

  orderMode: "restaurant" | "delivery";
  setOrderMode: (mode: "restaurant" | "delivery") => void;

  foodPreference: "veg" | "nonveg";
  setFoodPreference: (mode: "veg" | "nonveg") => void;
}


const Navbar: React.FC<NavbarProps> = ({cartCount, toggleCart,mobileSearch, orderMode, setOrderMode, foodPreference, setFoodPreference}) => {
  console.log(mobileSearch)
    return(
      <nav className=" sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            
            <p>F</p>
          </div>
          <span className="hidden md:flex text-xl font-bold text-gray-900 tracking-tight">Foodic</span>
        </div>

        {/* table number  */}
      {orderMode == "restaurant" &&(
        <div className="flex">
          <h2 className="text-sm font-bold ">Table No.</h2>
          
        </div>
      )

      }
  
        <div className={` md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96 ${mobileSearch? "flex":"hidden"}`}>
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search your favorite food..."
            className="bg-transparent border-none outline-none px-3 w-full text-sm"
          />
          <X />
        </div>
  
        <div className="flex items-center gap-4">
          <div className={` gap-2 justify-center items-center ${mobileSearch?"hidden":"flex"}`}>
          {/* Restaurant / Delivery Toggle */}
          <div
            className="relative w-24 md:w-28 h-8 md:h-10 text-xs md:text-lg cursor-pointer [perspective:1000px]"
            onClick={() =>
              setOrderMode(orderMode === "restaurant" ? "delivery" : "restaurant")
            }
          >
            <div
              className={`relative w-full h-full rounded-full transition-transform duration-500 [transform-style:preserve-3d] ${
                orderMode === "restaurant"
                  ? "[transform:rotateX(0deg)]"
                  : "[transform:rotateX(180deg)]"
              }`}
            >
              {/* FRONT: Restaurant */}
              <div className="absolute inset-0 bg-orange-500 text-white flex items-center justify-center rounded-full [backface-visibility:hidden]">
                RESTAURANT
              </div>

              {/* BACK: Delivery */}
              <div className="absolute inset-0 bg-blue-500 text-white flex items-center justify-center rounded-full [transform:rotateX(180deg)] [backface-visibility:hidden]">
                DELIVERY
              </div>
            </div>
          </div>


          {/* Veg/Non-Veg Toggle */}
          <div
            className="relative w-20 md:w-28 h-8 md:h-10 text-xs md:text-lg cursor-pointer [perspective:1000px]"
            onClick={() =>
              setFoodPreference(foodPreference === "veg" ? "nonveg" : "veg")
            }
          >
            <div
              className={`relative w-full h-full rounded-full transition-transform duration-500 [transform-style:preserve-3d] ${
                foodPreference === "veg"
                  ? "[transform:rotateX(0deg)]"
                  : "[transform:rotateX(180deg)]"
              }`}
            >
              {/* FRONT: Veg */}
              <div className="absolute inset-0 bg-green-600 text-white flex items-center justify-center rounded-full [backface-visibility:hidden]">
                VEG
              </div>

              {/* BACK: Non-Veg */}
              <div className="absolute inset-0 bg-red-600 text-white flex items-center justify-center rounded-full [transform:rotateX(180deg)] [backface-visibility:hidden]">
                NON-VEG
              </div>
            </div>
          </div>


          

          </div>
          <button className="hidden md:flex p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors md:hidden">
            <Search size={20} />
          </button>
          <button 
            onClick={toggleCart}
            className="hidden md:flex relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all group"
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
          <div className="w-9 h-9 hidden md:flex bg-gray-200 rounded-full overflow-hidden border-2 border-orange-100 cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
        </div>
      </div>
    </nav>
    )
};

export default Navbar;
