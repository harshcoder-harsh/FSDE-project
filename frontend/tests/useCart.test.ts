import { useCart } from '../../src/store/useCart';

describe('Cart Store', () => {
  beforeEach(() => {
    useCart.getState().clearCart();
  });

  it('should add an item to the cart', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      description: 'Test',
      imageUrl: 'test.jpg',
      category: 'Test'
    };

    useCart.getState().addItem(product);
    expect(useCart.getState().items.length).toBe(1);
    expect(useCart.getState().items[0].quantity).toBe(1);
  });

  it('should increase quantity if item already exists', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      description: 'Test',
      imageUrl: 'test.jpg',
      category: 'Test'
    };

    useCart.getState().addItem(product);
    useCart.getState().addItem(product);
    
    expect(useCart.getState().items.length).toBe(1);
    expect(useCart.getState().items[0].quantity).toBe(2);
  });

  it('should calculate total correctly', () => {
    const product1 = { id: '1', name: 'p1', price: 100, description: '', imageUrl: '', category: '' };
    const product2 = { id: '2', name: 'p2', price: 50, description: '', imageUrl: '', category: '' };

    useCart.getState().addItem(product1);
    useCart.getState().addItem(product1);
    useCart.getState().addItem(product2);

    expect(useCart.getState().total()).toBe(250);
  });
});
