import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { useAuth } from '../store/useAuth';

export default function Navbar() {
  const { toggleCart, items } = useCart();
  const { user, logout } = useAuth();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-30 bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="md:hidden text-zinc-400 hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            LUXE.
          </Link>
          <div className="hidden md:flex items-center gap-8 ml-12 text-sm font-medium tracking-wide">
            <button onClick={() => handleScroll('collection')} className="text-white hover:text-zinc-300 transition-colors uppercase tracking-widest">NEW ARRIVALS</button>
            <button onClick={() => handleScroll('collection')} className="text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">COLLECTIONS</button>
            <button onClick={() => handleScroll('editorial')} className="text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">EDITORIAL</button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400 hidden md:block">Hi, {user.name?.split(' ')[0] || 'User'}</span>
              <button 
                onClick={logout}
                className="text-xs font-medium text-white/70 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-zinc-400 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </Link>
          )}

          <button 
            onClick={toggleCart}
            className="text-zinc-400 hover:text-white transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
