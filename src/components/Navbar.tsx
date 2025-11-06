import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
// IMPORT Link dan NavLink dari react-router-dom
import { Link, NavLink } from 'react-router-dom';

// Navbar tidak perlu props 'onNavigate' atau 'currentPage' lagi
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Produk', path: '/produk' },
    { name: 'Tentang Kami', path: '/tentang' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <nav className="bg-white border-b border-[var(--netral-garis-batas)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo sekarang adalah <Link> ke Halaman Utama */}
          <Link to="/" className="flex items-center cursor-pointer">
            <ShoppingBag className="h-8 w-8 text-[var(--brand-coklat-sedang)]" />
            <span className="ml-2 text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '20px' }}>
              Toko Umma Dzikri
            </span>
          </Link>

          {/* Desktop Navigation (Gunakan <NavLink>) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                // NavLink otomatis tahu halaman mana yang "aktif"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? 'text-[var(--brand-coklat-tua)]'
                      : 'text-[var(--netral-abu-abu)] hover:text-[var(--brand-coklat-tua)]'
                  }`
                }
                style={({ isActive }) => ({
                  fontFamily: 'Montserrat',
                  fontWeight: isActive ? 600 : 400,
                })}
              >
                {item.name}
              </NavLink>
            ))}
            {/* Tombol Admin (Gunakan <Link>) */}
            <Link
              to="/admin/dashboard" // INI ADALAH RUTE "TERGEMBOK"
              className="p-2 rounded-full hover:bg-[var(--brand-coklat-muda)] transition-colors"
            >
              <User className="h-5 w-5 text-[var(--brand-coklat-sedang)]" />
            </Link>
          </div>

          {/* Mobile menu button (logika ini tetap sama) */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[var(--brand-coklat-tua)]" />
            ) : (
              <Menu className="h-6 w-6 text-[var(--brand-coklat-tua)]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation (Gunakan <NavLink> dan <Link>) */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)} // Tutup menu saat diklik
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[var(--brand-coklat-muda)] text-[var(--brand-coklat-tua)]'
                      : 'text-[var(--netral-abu-abu)] hover:bg-[var(--brand-coklat-muda)]'
                  }`
                }
                style={({ isActive }) => ({
                  fontFamily: 'Montserrat',
                  fontWeight: isActive ? 600 : 400,
                })}
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 rounded-lg text-[var(--netral-abu-abu)] hover:bg-[var(--brand-coklat-muda)]"
              style={{ fontFamily: 'Montserrat', fontWeight: 400 }}
            >
              Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
