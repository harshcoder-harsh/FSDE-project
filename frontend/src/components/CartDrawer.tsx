import { useCart } from '../store/useCart';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={toggleCart}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-medium tracking-wide text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button 
            onClick={toggleCart}
            className="text-zinc-400 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-medium text-white truncate pr-4">{item.name}</h3>
                    <p className="text-zinc-400 text-sm mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-3 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white w-4 text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between mb-6">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-xl font-medium text-white">${total().toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                toggleCart();
                navigate('/checkout');
              }}
              className="w-full bg-white text-black py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
