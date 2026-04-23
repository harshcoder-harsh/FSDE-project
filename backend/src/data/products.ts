const baseImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', // Watch
  'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800', // Bag
  'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800', // Overcoat
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800', // Sunglasses
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800', // Sneakers
  'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800', // Desk Lamp
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', // Shoe red
  'https://images.unsplash.com/photo-1620805183353-9378c2dfa9a4?auto=format&fit=crop&q=80&w=800', // Minimal Bag
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', // Headphones
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800', // Smartwatch
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800', // Perfume
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=800', // Watch 2
  'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=80&w=800', // Ring
  'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=800', // Skincare
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800', // Chair
];

const adjectives = ['Matte', 'Obsidian', 'Brushed', 'Cashmere', 'Silk', 'Ceramic', 'Titanium', 'Carbon', 'Midnight', 'Onyx', 'Minimal', 'Essential', 'Monochrome', 'Phantom', 'Ghost'];
const nouns = ['Chronograph', 'Overcoat', 'Tote', 'Desk Lamp', 'Wallet', 'Sneaker', 'Sunglasses', 'Headphones', 'Eau de Parfum', 'Lounge Chair', 'Briefcase', 'Signet Ring', 'Cardholder', 'Messenger', 'Chelsea Boot'];
const categories = ['Watches', 'Accessories', 'Apparel', 'Footwear', 'Home', 'Leather Goods', 'Tech', 'Fragrance'];

const descriptions = [
  'A masterclass in reduction. Designed to eliminate shadows and clutter.',
  'Crafted from aerospace-grade materials for the uncompromising aesthete.',
  'Unapologetic minimalism. Every stitch is intentional, every angle refined.',
  'An essential piece for the modern wardrobe, transcending seasonal trends.',
  'Form follows function in this striking, monochromatic masterpiece.',
  'Precision engineered. Stripped of all non-essential elements.',
  'Deep, light-absorbing textures that command attention without shouting.'
];

export const generateProducts = (count: number) => {
  const products = [];
  
  for (let i = 0; i < count; i++) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const imageUrl = baseImages[Math.floor(Math.random() * baseImages.length)];
    const price = Math.floor(Math.random() * 800) + 95; // $95 to $895
    
    products.push({
      name: `${adjective} ${noun}`,
      price: price + 0.00, // keep decimal
      description,
      imageUrl,
      category
    });
  }

  return products;
};

export const seedProducts = generateProducts(80);
