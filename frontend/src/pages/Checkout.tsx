import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("success")) {
      setSuccess(true);
      setOrderId(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      clearCart();
    }
  }, [location, clearCart]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(i => ({ productId: i.id, quantity: i.quantity })) }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned', data);
        alert('Failed to initialize checkout session. ' + (data.error || ''));
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred during checkout.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex flex-col items-center justify-center p-6">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Order Confirmed</h1>
        <p className="text-zinc-400 text-lg mb-2">Thank you for your purchase.</p>
        <p className="text-zinc-500 mb-8">Order ID: <span className="text-white">{orderId}</span></p>
        <button 
          onClick={() => navigate('/')}
          className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold tracking-tighter mb-6">Your cart is empty</h1>
        <button 
          onClick={() => navigate('/')}
          className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_400px] gap-12 mt-12">
        
        {/* Form Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tighter mb-8">Checkout</h1>
          <p className="text-zinc-400 mb-8">You will be securely redirected to Stripe to complete your purchase.</p>
          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Proceed to Secure Payment'}
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-zinc-900/50 p-6 md:p-8 rounded-2xl h-fit border border-zinc-800">
          <h2 className="text-xl font-medium mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 rounded-md bg-zinc-800 overflow-hidden relative flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute -top-2 -right-2 bg-zinc-700 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-zinc-500 text-xs">{item.category}</p>
                </div>
                <div className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-zinc-800 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-4 pt-4 flex justify-between items-center">
            <span className="font-medium text-lg">Total</span>
            <span className="font-medium text-xl">${total().toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
