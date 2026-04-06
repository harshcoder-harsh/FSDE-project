import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, getCartTotal, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold dark:text-white">Your Cart is Empty</h2>
        <Link to="/products" className="mt-4 inline-block text-eco-primary font-medium hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold dark:text-white mb-8">Your Cart</h2>
      <div>
        {cartItems.map(item => (
          <div key={item._id} className="flex items-center justify-between border-b dark:border-gray-700 py-4">
             <div className="flex items-center space-x-4">
                <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt={item.title} className="w-16 h-16 rounded object-cover" />
                <div>
                   <h3 className="font-bold dark:text-white">{item.title}</h3>
                   <p className="text-sm dark:text-gray-400">Qty: {item.quantity}</p>
                </div>
             </div>
             <div className="flex items-center space-x-4">
                <span className="font-bold dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
             </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <span className="text-xl font-bold dark:text-white">Total: ${getCartTotal().toFixed(2)}</span>
        <button onClick={() => alert('Proceeding to checkout workflow...')} className="bg-eco-primary text-white px-6 py-2 rounded-full font-medium hover:bg-eco-dark transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
