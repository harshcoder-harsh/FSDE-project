const db = require('./setup');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const mongoose = require('mongoose');

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('Mongoose Models Test', () => {
  it('Should successfully hash the password of a saved user', async () => {
    const user = new User({
      name: 'Test Customer',
      email: 'test@customer.com',
      password: 'password123'
    });
    const savedUser = await user.save();
    expect(savedUser.password).not.toBe('password123'); // Ensure it hashed
    
    // Matcher logic
    const isMatched = await savedUser.matchPassword('password123');
    expect(isMatched).toBe(true);
  });

  it('Should fail assigning invalid ecoScore to a product', async () => {
    const p = new Product({
      title: 'Bad Eco',
      description: 'Desc',
      price: 10,
      vendorId: new mongoose.Types.ObjectId(),
      ecoScore: 'ultra-high', // invalid enum
      location: 'NY',
      category: 'Test'
    });

    let err;
    try {
      await p.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
