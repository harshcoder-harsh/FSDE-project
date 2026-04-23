import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCart, Product } from '../store/useCart';
import { apiUrl } from '../lib/api';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(apiUrl('/api/products'))
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Product) => p.id === id);
        if (found) {
          setProduct(found);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-20 text-white gap-6">
        <h1 className="text-4xl font-bold tracking-tighter">{error || 'Product Not Found'}</h1>
        <button onClick={() => navigate(-1)} className="text-zinc-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 selection:bg-white selection:text-black">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 md:py-24 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="aspect-[3/4] bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] relative group">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-700 filter grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="flex flex-col justify-center max-w-xl">
          <button 
            onClick={() => navigate(-1)}
            className="text-zinc-500 hover:text-white flex items-center gap-2 mb-12 w-fit transition-colors uppercase tracking-widest text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Vault
          </button>
          
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-sm mb-6 border-l border-zinc-500 pl-4">{product.category}</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">{product.name}</h1>
          <p className="text-3xl font-medium mb-10">${product.price.toFixed(2)}</p>
          
          <div className="w-full h-px bg-gradient-to-r from-zinc-800 to-transparent mb-10" />
          
          <p className="text-zinc-400 text-lg font-light leading-relaxed mb-12">
            {product.description}
          </p>
          
          <button 
            onClick={() => addItem(product)}
            className="group relative w-full bg-white text-black py-5 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-95 duration-200 overflow-hidden"
          >
            <span className="relative z-10">Add to Collection</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-zinc-300 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}
