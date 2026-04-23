import { Link } from 'react-router-dom';
import { Product } from '../store/useCart';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/10 rounded-2xl mb-4 backdrop-blur-sm transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Hover Action Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
            View Details
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start px-2">
        <div>
          <h3 className="text-lg font-medium text-white group-hover:text-zinc-300 transition-colors">{product.name}</h3>
          <p className="text-zinc-500 text-sm mt-1 uppercase tracking-wider text-[10px]">{product.category}</p>
        </div>
        <span className="text-white font-medium bg-white/10 px-3 py-1 rounded-full text-sm border border-white/5 backdrop-blur-md">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}
