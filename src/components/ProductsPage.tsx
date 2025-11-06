import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Impor Supabase
import { ProductCard } from './ProductCard'; // Impor kartu yang baru
import { Loader2 } from 'lucide-react';

// Definisikan tipe data Produk (sesuai database)
interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

// Daftar kategori (sama seperti di AdminDashboard)
const categories = [
  "Semua", // Tambahkan "Semua" di awal
  "Souvenir",
  "Pakaian",
  "Makanan & Minuman"
];

export function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Menyimpan semua produk
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Untuk ditampilkan
  const [selectedCategory, setSelectedCategory] = useState("Semua"); // Filter aktif
  const [isLoading, setIsLoading] = useState(true);

  // 1. Mengambil data dari Supabase saat halaman dibuka
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('produk')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        setAllProducts(data);
        setFilteredProducts(data); // Awalnya, tampilkan semua
      }
      setIsLoading(false);
    }

    fetchProducts();
  }, []);

  // 2. Efek untuk mem-filter produk saat kategori diubah
  useEffect(() => {
    if (selectedCategory === "Semua") {
      setFilteredProducts(allProducts); // Tampilkan semua
    } else {
      // Filter berdasarkan kategori
      const filtered = allProducts.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, allProducts]); // Jalankan jika kategori atau data produk berubah

  return (
    <div className="bg-[var(--netral-putih-bg)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Halaman (Opsional, jika Anda mau) */}
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
            {/* Jumlah Produk */}
            <p className="text-sm text-[var(--netral-abu-abu)] mb-4">
              Menampilkan {filteredProducts.length} produk
            </p>

            {/* Grid Produk */}
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