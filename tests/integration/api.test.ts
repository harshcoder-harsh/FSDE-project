import request from 'supertest';
import app from '../../api/index';

describe('API Integration Tests', () => {
  it('GET /api/products should return a list of products', async () => {
    const res = await request(app).get('/api/products');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
  });

  it('POST /api/orders should return success for valid order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        items: [{ productId: '1', quantity: 2 }],
        email: 'test@example.com'
      });
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Order created successfully');
    expect(res.body).toHaveProperty('orderId');
  });

  it('POST /api/orders should fail if items are missing', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ email: 'test@example.com' });
      
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'No items in order');
  });
});
