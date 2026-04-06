import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, Sun, Moon, Leaf, User } from 'lucide-react';

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-eco-primary" />
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">LocalLoop</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-eco-primary font-medium transition-colors">
              Explore
            </Link>
            
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-500" />}
            </button>

            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                 <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-eco-primary rounded-full">
                    {cartItems.length}
                 </span>
              )}
            </Link>

            {user ? (
               <div className="flex items-center space-x-4">
                 <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
                 <button onClick={logout} className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Logout</button>
               </div>
            ) : (
               <Link to="/login" className="flex items-center space-x-2 bg-eco-primary text-white px-4 py-2 rounded-full font-medium hover:bg-eco-dark transition-colors shadow-sm">
                 <User className="h-4 w-4" />
                 <span>Login</span>
               </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
