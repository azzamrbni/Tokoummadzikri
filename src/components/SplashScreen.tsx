import React from 'react';
import { ShoppingBag } from 'lucide-react'; // Menggunakan ikon logo Anda

export function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--brand-coklat-muda)] z-[9999]">
      <div className="flex items-center text-[var(--brand-coklat-tua)]">
        {/* Ikon logo kita buat berdenyut (pulse) */}
        <ShoppingBag className="h-16 w-16 animate-pulse" />
        <span className="ml-4 text-4xl" style={{ fontFamily: 'Nunito', fontWeight: 700 }}>
          Toko Umma Dzikri
        </span>
      </div>
      <p 
        className="text-[var(--netral-abu-abu)] mt-4 text-lg" 
        style={{ fontFamily: 'Montserrat' }}
      >
        Memuat...
      </p>
    </div>
  );
}
