import React, { useState, useEffect } from 'react';
// import { supabase } from '../supabaseClient'; // <-- DIHAPUS
import { ProductCard } from './ProductCard'; 
import { Loader2 } from 'lucide-react';

// Alamat API Backend Anda
const API_URL = 'https://api-tokoummadzikri.duckdns.org';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const categories = [
  "Semua",
  "Souvenir",
  "Pakaian",
  "Makanan & Minuman"
];

export function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]); 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 
  const [selectedCategory, setSelectedCategory] = useState("Semua"); 
  const [isLoading, setIsLoading] = useState(true);

  // --- (DIUBAH) FUNGSI MENGAMBIL DATA ---
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/produk`);
        if (!response.ok) throw new Error('Gagal mengambil data produk');
        const data = await response.json();
        
        setAllProducts(data);
        setFilteredProducts(data); 
      } catch (error: any) {
        console.error('Error fetching products:', error);
      }
      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  // Efek filter (Tidak berubah)
  useEffect(() => {
    if (selectedCategory === "Semua") {
      setFilteredProducts(allProducts); 
    } else {
      const filtered = allProducts.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, allProducts]);

  // --- JSX (Tampilan) tidak ada perubahan ---
  return (
    <div className="bg-[var(--netral-putih-bg)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--brand-coklat-tua)]">Koleksi Produk</h1>
          <p className="text-lg text-[var(--netral-abu-abu)] mt-2">Temukan semua kebutuhan Anda di sini</p>
        </div>

        {/* Filter Kategori */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[var(--netral-hitam)] mb-3">Kategori</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[var(--brand-coklat-sedang)] text-white'
                    : 'bg-white text-[var(--netral-abu-abu)] hover:bg-gray-100 border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tampilan Loading */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-[var(--brand-coklat-sedang)] animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--netral-abu-abu)] mb-4">
              Menampilkan {filteredProducts.length} produk
            </p>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-[var(--netral-abu-abu)]">
                <p>Produk tidak ditemukan di kategori ini.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}