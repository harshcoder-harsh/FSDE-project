import { test, expect } from '@playwright/test';

test('has title and can navigate products', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ShopSmart|LocalLoop/i);

  // Click on explore
  await page.click('text=Explore');
  await expect(page).toHaveURL(/.*products/);

  // Verify product discovery is visible
  await expect(page.locator('text=Discover Sustainable Products')).toBeVisible();

  // Add an item to cart (first one)
  await page.locator('text=Add to Cart').first().click();
  
  // Navigate to Cart
  await page.goto('/cart');
  await expect(page.locator('text=Your Cart')).toBeVisible();
});
