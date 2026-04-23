import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { seedProducts } from './data/products.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

const MONGODB_URI = process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      Product.countDocuments().then(count => {
        if (count < 70) {
          Product.deleteMany({}).then(() => {
            Product.insertMany(seedProducts).then(() => console.log(`Seeded ${seedProducts.length} luxury items`));
          });
        }
      });
    })
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn('MONGODB_URI not set. Falling back to in-memory products.');
}

// Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  category: String
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  email: String,
  items: [{ productId: String, quantity: Number }],
  shippingAddress: String,
  totalAmount: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    stripeConfigured: Boolean(STRIPE_SECRET_KEY),
    mongoConfigured: Boolean(MONGODB_URI),
  });
});

// Auth Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Product & Order Routes
app.get('/api/products', async (req, res) => {
  try {
    if (!MONGODB_URI) {
      return res.json(seedProducts.map((p, idx) => ({ ...p, id: String(idx + 1) })));
    }
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' });
  }

  try {
    if (!stripe) {
      return res.status(500).json({ error: 'Payments are not configured on the server.' });
    }

    const origin = (req.headers.origin as string) || process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
    const lineItems = await Promise.all(items.map(async (item: any) => {
      let product;
      if (mongoose.Types.ObjectId.isValid(item.productId)) {
        product = await Product.findById(item.productId);
      }
      
      const price =
        (product?.price ?? null) !== null
          ? (product?.price as number)
          : item.productId === '1'
            ? 295
            : item.productId === '2'
              ? 450
              : item.productId === '3'
                ? 890
                : 100;
      const name = product ? product.name : 'Premium Item';
      const image = product ? product.imageUrl : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800';

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: name,
            images: [image],
          },
          unit_amount: Math.round((price as number) * 100),
        },
        quantity: item.quantity,
      };
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout?success=true`,
      cancel_url: `${origin}/checkout?canceled=true`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  const { items, email, shippingAddress } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items in order' });
  }

  let totalAmount = 0;
  for (const item of items) {
    let price = 0;
    if (mongoose.Types.ObjectId.isValid(item.productId)) {
      const product = await Product.findById(item.productId);
      if (product?.price != null) {
        price = product.price as number;
      }
    } else {
      if (item.productId === '1') price = 295.00;
      else if (item.productId === '2') price = 450.00;
      else if (item.productId === '3') price = 890.00;
      else price = 100.00;
    }
    totalAmount += price * item.quantity;
  }

  try {
    const order = new Order({
      email,
      items,
      shippingAddress,
      totalAmount,
      status: 'paid'
    });
    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      orderId: order._id
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
