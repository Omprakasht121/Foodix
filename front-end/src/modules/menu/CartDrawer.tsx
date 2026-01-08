// import { CartItem } from "@/types";
import {motion, AnimatePresence} from "framer-motion"
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import type { CartItem } from "../../types";
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemove,
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // JSX unchanged
  return(
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
  )
};

export default CartDrawer;
