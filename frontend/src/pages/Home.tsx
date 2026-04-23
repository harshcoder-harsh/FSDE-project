import { ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../store/useCart';
import { motion } from 'framer-motion';
import { apiUrl } from '../lib/api';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    fetch(apiUrl('/api/products'))
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img 
            initial={{ scale: 1.1, filter: "grayscale(100%) blur(4px)" }}
            animate={{ scale: 1, filter: "grayscale(100%) blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-32 h-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] mb-6 text-white mix-blend-overlay">
                NOIR
              </h1>
              <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                EDITION
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl text-zinc-300 mb-12 font-light tracking-wide max-w-2xl border-l-2 border-white/20 pl-6 backdrop-blur-sm"
            >
              A masterclass in reduction. <br className="hidden md:block" />
              Discover the new collection of meticulously crafted, monochromatic essentials.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex gap-6"
            >
              <button 
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-4">
                  Enter the Vault <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-zinc-300 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract Geometry */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] border border-white/10 rounded-full border-dashed opacity-50 pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[1000px] h-[1000px] border border-white/5 rounded-full border-dotted opacity-30 pointer-events-none"
        />
      </section>

      {/* Featured Collection */}
      <section id="collection" className="py-32 px-6 max-w-[1600px] mx-auto relative">
        <div className="absolute top-0 right-10 w-96 h-96 bg-white/5 rounded-full blur-[100px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 relative z-10"
        >
          <div>
            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-4">THE VAULT.</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light">Eighty meticulously curated luxury items. Uncompromising quality.</p>
          </div>
          <div className="text-zinc-500 font-medium bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 uppercase tracking-widest text-sm">
            {products.length} ITEMS
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-32">
              <Loader2 className="w-10 h-10 animate-spin text-zinc-500" />
            </div>
          ) : (
            products.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {!loading && visibleCount < products.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 15)}
              className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors"
            >
              Load More Pieces
            </button>
          </div>
        )}
      </section>

      {/* Heavy Marquee Section */}
      <section className="py-24 overflow-hidden border-y border-white/5 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-400 opacity-30 mx-8">
            MINIMALISM · ESSENTIALS · NOIR · CRAFTSMANSHIP ·
            MINIMALISM · ESSENTIALS · NOIR · CRAFTSMANSHIP ·
          </h2>
        </motion.div>
      </section>

      {/* Editorial Section */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?auto=format&fit=crop&q=80&w=2000')] opacity-5 mix-blend-screen" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden relative group border border-white/5 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000" 
              alt="Editorial"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 filter grayscale group-hover:grayscale-0"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              The Art of <br/> Less.
            </h2>
            <p className="text-xl text-zinc-400 mb-8 font-light leading-relaxed border-l-2 border-zinc-800 pl-6">
              We believe in removing the unnecessary. Our design philosophy centers around creating objects that serve their purpose perfectly while maintaining an understated elegance. Every stitch, every material choice is intentional.
            </p>
            <button className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
              Read Our Story
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
