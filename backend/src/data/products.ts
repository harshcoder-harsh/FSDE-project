const adjectives = ['Matte', 'Obsidian', 'Brushed', 'Cashmere', 'Silk', 'Ceramic', 'Titanium', 'Carbon', 'Midnight', 'Onyx', 'Minimal', 'Essential', 'Monochrome', 'Phantom', 'Ghost'];

const productTemplates = [
  {
    nouns: ['Chronograph', 'Smartwatch', 'Watch'],
    category: 'Watches',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Overcoat', 'Jacket'],
    category: 'Apparel',
    images: [
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Tote', 'Briefcase', 'Messenger', 'Bag'],
    category: 'Leather Goods',
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620805183353-9378c2dfa9a4?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Sneaker', 'Chelsea Boot', 'Shoe'],
    category: 'Footwear',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Desk Lamp'],
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Sunglasses'],
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Headphones'],
    category: 'Tech',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Eau de Parfum', 'Perfume', 'Skincare'],
    category: 'Fragrance',
    images: [
      'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Lounge Chair', 'Chair'],
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    nouns: ['Signet Ring', 'Ring'],
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

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
    
    // Pick a random template
    const template = productTemplates[Math.floor(Math.random() * productTemplates.length)];
    
    const noun = template.nouns[Math.floor(Math.random() * template.nouns.length)];
    const category = template.category;
    const imageUrl = template.images[Math.floor(Math.random() * template.images.length)];
    
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
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
