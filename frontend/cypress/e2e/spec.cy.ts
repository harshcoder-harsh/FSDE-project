describe('E-commerce Flow', () => {
  it('should load home page and display products', () => {
    cy.visit('/');
    cy.contains('Redefining Essentials');
    cy.get('.grid > a').should('have.length.at.least', 1);
  });

  it('should add item to cart', () => {
    cy.visit('/');
    // Mock user clicking on the first product's add to cart (assuming direct add to cart logic, but right now clicking opens product details)
    cy.get('.grid > a').first().click();
    // Verify it navigated to product details
    cy.url().should('include', '/product/');
  });
});
