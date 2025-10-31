import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { InputField } from "./InputField";
import { Filter } from "lucide-react";
import { productsData } from "../data/products";

interface ProductsPageProps {
  onProductClick: (productId: number) => void;
}

export function ProductsPage({ onProductClick }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    "Sajadah & Perlengkapan Shalat",
    "Al-Qur'an & Buku Islami",
    "Pakaian Muslim",
    "Wangi-wangian",
    "Makanan & Minuman"
  ];

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--netral-putih-bg)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[var(--brand-coklat-tua)] mb-2">Semua Produk</h1>
          <p className="text-[var(--netral-abu-abu)]">
            Temukan produk islami pilihan untuk kebutuhan Anda
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <InputField
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={setSearchQuery}
            icon
          />

          {/* Category Filter */}
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 text-[var(--netral-abu-abu)] mt-2">
              <Filter className="h-5 w-5" />
              <span style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>Kategori:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-[var(--aksen-kuning-cerah)] text-[var(--netral-hitam)]'
                      : 'bg-white border border-[var(--netral-garis-batas)] text-[var(--netral-abu-abu)] hover:border-[var(--brand-coklat-sedang)]'
                  }`}
                  style={{ fontFamily: 'Montserrat', fontWeight: selectedCategory === category ? 600 : 400 }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <p className="text-[var(--netral-abu-abu)]">
            Menampilkan {filteredProducts.length} produk
          </p>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                showPrice={false}
                onButtonClick={() => onProductClick(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--netral-abu-abu)]" style={{ fontSize: '18px' }}>
              Tidak ada produk yang ditemukan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
