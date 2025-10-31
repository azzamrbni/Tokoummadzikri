import { ShoppingBag, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--brand-coklat-sedang)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-8 w-8" />
              <span className="ml-2" style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '20px' }}>
                Toko Umma Dzikri
              </span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              Menyediakan produk islami berkualitas untuk memenuhi kebutuhan spiritual Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[var(--aksen-kuning-cerah)] transition-colors" style={{ fontSize: '14px' }}>
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--aksen-kuning-cerah)] transition-colors" style={{ fontSize: '14px' }}>
                  Produk
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--aksen-kuning-cerah)] transition-colors" style={{ fontSize: '14px' }}>
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--aksen-kuning-cerah)] transition-colors" style={{ fontSize: '14px' }}>
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span style={{ fontSize: '14px' }}>
                  Jl. Contoh No. 123, Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span style={{ fontSize: '14px' }}>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span style={{ fontSize: '14px' }}>info@ummadzikri.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--aksen-kuning-cerah)] hover:text-[var(--netral-hitam)] transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--aksen-kuning-cerah)] hover:text-[var(--netral-hitam)] transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p style={{ fontSize: '14px' }}>
            © 2025 Toko Umma Dzikri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
