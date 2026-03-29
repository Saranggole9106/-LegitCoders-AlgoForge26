import { Link, useLocation } from "react-router";
import { MapPin, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/planner", label: "Planner" },
  { to: "/explore", label: "Explore" },
  { to: "/compare", label: "Compare" },
  { to: "/trips", label: "Trips" },
];

export function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollBlur, setScrollBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      // Calculate blur amount based on scroll (max 20px)
      const blurAmount = Math.min(scrollY / 10, 20);
      setScrollBlur(blurAmount);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div 
        className={`max-w-7xl mx-auto h-16 rounded-full flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#faf9f7]/80 shadow-[0_20px_50px_-15px_rgba(30,58,95,0.1)]' 
            : 'bg-white/90 shadow-[0_20px_50px_-15px_rgba(30,58,95,0.08)]'
        }`}
        style={{
          backdropFilter: `blur(${12 + scrollBlur}px)`,
          WebkitBackdropFilter: `blur(${12 + scrollBlur}px)`,
          border: `1px solid ${scrolled ? 'rgba(201, 169, 98, 0.2)' : 'rgba(30, 58, 95, 0.08)'}`,
        }}
      >
        <Link to="/" className="flex items-center gap-2 group/logo">
          <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center shadow-lg shadow-[#1e3a5f]/20 group-hover/logo:scale-110 transition-transform">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-[#1a1a1a] tracking-tighter">Transit<span className="text-[#1e3a5f]">Twin</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                  isActive
                    ? "text-white bg-[#1e3a5f] shadow-lg shadow-[#1e3a5f]/20"
                    : "text-[#6b6560] hover:text-[#1a1a1a] hover:bg-[#f5f0e8]"
                }`}>
                {label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/50 rounded-full pl-2 pr-4 py-1.5">
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-[#1a1a1a]">{user?.fullName || user?.email?.split('@')[0]}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#1e3a5f] text-white px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-105 active:scale-[0.98] transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
          <Link to="/compare"
            className="bg-[#b8954f] text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-105 active:scale-[0.98] transition-all">
            Start Journey
          </Link>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-[#faf9f7]/95 backdrop-blur-xl border border-[#e8e4de] rounded-[2.5rem] p-6 shadow-2xl space-y-2">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMobileMenuOpen(false)}
              className={`block px-6 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                location.pathname === to ? "text-white bg-[#1e3a5f] shadow-lg" : "text-[#6b6560] hover:bg-[#f5f0e8]"
              }`}>
              {label}
            </Link>
          ))}
          
          {/* Mobile Auth Buttons */}
          {isAuthenticated ? (
            <div className="border-t border-[#e8e4de] pt-4 mt-4">
              <div className="flex items-center gap-2 px-6 py-3 mb-3">
                <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a]">{user?.fullName || user?.email?.split('@')[0]}</p>
                  <p className="text-xs text-[#6b6560]">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full block px-6 py-4 rounded-full text-center bg-red-50 text-red-600 font-black uppercase tracking-[0.2em] text-sm"
              >
                <LogOut className="w-5 h-5 inline mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="border-t border-[#e8e4de] pt-4 mt-4 space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-4 rounded-full text-center border-2 border-[#1e3a5f] text-[#1e3a5f] font-black uppercase tracking-[0.2em] text-sm">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-4 rounded-full text-center bg-[#1e3a5f] text-white font-black uppercase tracking-[0.2em] text-sm">
                Sign Up
              </Link>
            </div>
          )}
          
          <Link to="/compare" onClick={() => setMobileMenuOpen(false)}
            className="block px-6 py-5 rounded-full text-center bg-[#b8954f] text-white font-black uppercase tracking-[0.2em] shadow-xl text-sm mt-4">
            Start Journey
          </Link>
        </div>
      )}
    </nav>
  );
}
