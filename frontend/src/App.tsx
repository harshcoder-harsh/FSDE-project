import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAuth } from './store/useAuth';

// Optional placeholder components for missing routes
const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
    <h1 className="text-4xl font-bold tracking-tighter">{title}</h1>
  </div>
);

function AppContent() {
  const location = useLocation();
  const hideNavAndCart = location.pathname === '/login' || location.pathname === '/signup';
  const token = useAuth((state) => state.token);
  const requiresAuth = location.pathname !== '/login' && location.pathname !== '/signup';

  if (requiresAuth && !token) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      {!hideNavAndCart && <Navbar />}
      {!hideNavAndCart && <CartDrawer />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Placeholder title="404 - Not Found" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
