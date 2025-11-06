import React from 'react';
import { Button } from './Button'; // Path sudah benar
import { ImageWithFallback } from './figma/ImageWithFallback'; 
import { Link } from 'react-router-dom'; 

// Definisikan tipe data Produk (sesuai database)
interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: string) => {
  if (!price) return "Rp 0";
  return `Rp ${parseInt(price).toLocaleString('id-ID')}`;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      to={`/produk/${product.id}`} 
      className="flex flex-col bg-white rounded-lg border border-[var(--netral-garis-batas)] overflow-hidden transition-all hover:shadow-lg"
    >
      {/* Gambar Produk */}
      <div className="w-full aspect-square overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Konten Teks */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[var(--brand-coklat-tua)] mb-2">
          {product.title}
        </h3>
        <p className="text-[var(--netral-abu-abu)] text-sm mb-4 line-clamp-3 flex-grow">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-[var(--brand-coklat-sedang)]">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* --- PERBAIKAN DI SINI ---
           Kita pindahkan className="w-full mt-auto" ke <div> pembungkus 
           karena <Button> tidak bisa menerimanya.
        */}
        <div className="w-full mt-auto">
          <Button fullWidth> {/* Kita juga bisa tambahkan prop 'fullWidth' jika ada */}
            Selengkapnya
          </Button>
        </div>
        {/* --------------------------- */}
      </div>
    </Link>
  );
}