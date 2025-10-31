import { ProductCard } from "./ProductCard";
import { Button } from "./Button";
import { MapPin, ShoppingBag, Truck, Sparkles, Star } from "lucide-react";
import { productsData } from "../data/products";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onProductClick: (productId: number) => void;
}

export function HomePage({ onNavigate, onProductClick }: HomePageProps) {
  // Get first 6 products as featured
  const featuredProducts = productsData.slice(0, 6);

  const advantages = [
    {
      icon: MapPin,
      title: "Lokal & Strategis",
      description: "Hadir di Depok, lebih dekat dengan Anda"
    },
    {
      icon: ShoppingBag,
      title: "Variasi Lengkap",
      description: "Semua kebutuhan anak (makanan, pakaian, mainan, souvenir) dalam satu toko"
    },
    {
      icon: Sparkles,
      title: "Hemat Ongkir",
      description: "Belanja banyak kategori cukup di satu toko"
    },
    {
      icon: Truck,
      title: "Pengiriman Cepat",
      description: "Layanan pengiriman instan di hari yang sama"
    }
  ];

  const categories = [
    { name: "Makanan Bayi", image: "https://images.unsplash.com/photo-1679493419398-671bc52317e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlcyUyMGZydWl0JTIwcmFtYWRhbnxlbnwxfHx8fDE3NjE5MjcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Pakaian Anak", image: "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Mainan Edukatif", image: "https://images.unsplash.com/photo-1645067373243-1f44e880961d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Merchandise Islami", image: "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080" }
  ];

  const testimonials = [
    {
      name: "Rina Sari",
      text: "Saya sangat puas! Produk bayi yang dijual selalu fresh dan tidak expired. Sangat membantu untuk kebutuhan anak saya.",
      rating: 5
    },
    {
      name: "Ahmad Hidayat",
      text: "Toko merchandise islami terlengkap di Depok. Cocok banget untuk oleh-oleh acara pengajian dan aqiqah.",
      rating: 5
    },
    {
      name: "Fitri Handayani",
      text: "Pelayanan ramah dan cepat tanggap via WhatsApp. Pengiriman juga super cepat, pesan pagi sore sudah sampai!",
      rating: 5
    }
  ];

  const handleShopeeClick = () => {
    window.open('https://shopee.co.id', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--brand-coklat-muda)] to-[var(--aksen-oranye-lembut)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-[var(--brand-coklat-tua)] mb-6">
              Toko Perlengkapan Bayi dan Merchandise Islami Terlengkap di Depok
            </h1>
            <p className="text-[var(--netral-abu-abu)] mb-8 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
              Belanja praktis untuk semua kebutuhan anak dan keluarga muslim Anda. 
              Dari makanan bergizi, pakaian nyaman, hingga souvenir islami yang bermakna.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('products')}>
                Lihat Produk
              </Button>
              <Button variant="outline" onClick={handleShopeeClick}>
                Beli di Shopee
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[var(--brand-coklat-tua)] mb-4">Keunggulan Kami</h2>
            <p className="text-[var(--netral-abu-abu)] max-w-2xl mx-auto">
              Apa yang membuat Toko Umma Dzikri berbeda dari yang lain
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--aksen-kuning-cerah)] mb-4">
                  <advantage.icon className="h-8 w-8 text-[var(--brand-coklat-tua)]" />
                </div>
                <h4 className="text-[var(--brand-coklat-tua)] mb-2">{advantage.title}</h4>
                <p className="text-[var(--netral-abu-abu)]">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-[var(--netral-putih-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[var(--brand-coklat-tua)] mb-4">Kategori Produk</h2>
            <p className="text-[var(--netral-abu-abu)] max-w-2xl mx-auto">
              Jelajahi beragam kategori produk pilihan kami
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => onNavigate('products')}
                className="group relative overflow-hidden rounded-lg aspect-square bg-white border-2 border-[var(--netral-garis-batas)] hover:border-[var(--aksen-kuning-cerah)] transition-all"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white" style={{ fontWeight: 600 }}>{category.name}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[var(--brand-coklat-tua)] mb-4">Produk Best Seller</h2>
            <p className="text-[var(--netral-abu-abu)] max-w-2xl mx-auto">
              Produk-produk terpopuler dan paling diminati oleh pelanggan kami
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
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
          <div className="text-center mt-12">
            <Button variant="outline" onClick={() => onNavigate('products')}>
              Lihat Semua Produk
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[var(--netral-putih-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[var(--brand-coklat-tua)] mb-4">Testimoni Pelanggan</h2>
            <p className="text-[var(--netral-abu-abu)] max-w-2xl mx-auto">
              Apa kata pelanggan setia kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-[var(--netral-garis-batas)] shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[var(--aksen-kuning-cerah)] text-[var(--aksen-kuning-cerah)]" />
                  ))}
                </div>
                <p className="text-[var(--netral-hitam)] mb-4">"{testimonial.text}"</p>
                <p className="text-[var(--brand-coklat-sedang)]" style={{ fontWeight: 600 }}>
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[var(--brand-coklat-tua)] mb-4">Tentang Toko Umma Dzikri</h2>
          <p className="text-[var(--netral-abu-abu)] mb-8" style={{ fontSize: '18px' }}>
            Berawal dari fokus pada popok, kami berkembang untuk menjawab kebutuhan para ibu. 
            Kini kami melayani dengan lebih lengkap: pakaian, makanan bergizi, mainan edukatif, hingga merchandise islami.
          </p>
          <Button variant="outline" onClick={() => onNavigate('about')}>
            Baca Cerita Kami
          </Button>
        </div>
      </section>
    </div>
  );
}
