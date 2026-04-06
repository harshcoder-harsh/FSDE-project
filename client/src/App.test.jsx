import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

describe('App Layout Test', () => {
  it('renders LocalLoop brand name in the Navbar', () => {
    // Note: Due to limitations of mocking inner context calls or router dependencies, 
    // wrapping app provides a structurally sound validation test.
    render(
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
             <App />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    );
    const brandElement = screen.getByText(/LocalLoop/i);
    expect(brandElement).toBeInTheDocument();
  });
});
