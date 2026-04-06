import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products] = useState([
    { _id: '1', title: 'Organic Apples', price: 4.99, description: 'Fresh from local farm.', ecoScore: 'high', location: 'Seattle, WA', category: 'Food' },
    { _id: '2', title: 'Bamboo Toothbrush', price: 2.50, description: '100% biodegradable and eco-friendly standard size.', ecoScore: 'high', location: 'Portland, OR', category: 'Health' },
    { _id: '3', title: 'Recycled Paper Logs', price: 12.00, description: 'Long burning logs made safely.', ecoScore: 'low', location: 'Denver, CO', category: 'Home' }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Discover Sustainable Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(p => (
           <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
