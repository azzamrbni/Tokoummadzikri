import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', page: 'home' },
    { name: 'Produk', page: 'products' },
    { name: 'Tentang Kami', page: 'about' },
    { name: 'Kontak', page: 'contact' },
  ];

  return (
    <nav className="bg-white border-b border-[var(--netral-garis-batas)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <ShoppingBag className="h-8 w-8 text-[var(--brand-coklat-sedang)]" />
            <span className="ml-2 text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '20px' }}>
              Toko Umma Dzikri
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`transition-colors ${
                  currentPage === item.page
                    ? 'text-[var(--brand-coklat-tua)]'
                    : 'text-[var(--netral-abu-abu)] hover:text-[var(--brand-coklat-tua)]'
                }`}
                style={{ fontFamily: 'Montserrat', fontWeight: currentPage === item.page ? 600 : 400 }}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => onNavigate('admin')}
              className="p-2 rounded-full hover:bg-[var(--brand-coklat-muda)] transition-colors"
            >
              <User className="h-5 w-5 text-[var(--brand-coklat-sedang)]" />
            </button>
          </div>

          {/* Mobile menu button */}
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'bg-[var(--brand-coklat-muda)] text-[var(--brand-coklat-tua)]'
                    : 'text-[var(--netral-abu-abu)] hover:bg-[var(--brand-coklat-muda)]'
                }`}
                style={{ fontFamily: 'Montserrat', fontWeight: currentPage === item.page ? 600 : 400 }}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-[var(--netral-abu-abu)] hover:bg-[var(--brand-coklat-muda)]"
              style={{ fontFamily: 'Montserrat', fontWeight: 400 }}
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
