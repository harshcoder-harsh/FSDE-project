import { useCart } from '../context/CartContext';
import { ShoppingCart, Leaf } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const ecoScoreColor = {
    high: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
    medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
    low: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/300?text=Eco+Product'} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full flex items-center space-x-1 text-xs font-semibold ${ecoScoreColor[product.ecoScore]}`}>
          <Leaf className="w-3 h-3" />
          <span className="capitalize">{product.ecoScore} Impact</span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{product.title}</h3>
          <span className="font-bold text-eco-primary">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center">
          <span className="capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">{product.category}</span>
          <span className="mx-2">•</span>
          <span>📍 {product.location}</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-eco-primary hover:text-white dark:bg-gray-700 dark:hover:bg-eco-primary text-gray-700 dark:text-gray-200 font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
