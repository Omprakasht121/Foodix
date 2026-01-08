// import { MenuItem } from "@/types";
import {motion} from "framer-motion"
import { Clock, Flame, Heart, Plus, Star } from "lucide-react";
import type { MenuItem } from "../../types";
import { div } from "framer-motion/client";
interface FoodCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart }) => {
  // JSX unchanged
  return (
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
  )
};

export default FoodCard;
