import { useState, useEffect } from "react";
import { ChevronRight, ShoppingCart, MessageCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/Button"; // Sesuaikan path jika perlu
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link, useParams } from "react-router-dom"; // <-- IMPORT Link & useParams
import { supabase } from '../supabaseClient'; // <-- IMPORT SUPABASE

// Definisikan tipe data Produk (sesuai database)
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  images?: string[]; // (text[] di Supabase)
  ingredients?: string;
  nutrition?: string;
  servingSuggestion?: string;
  benefits?: string[]; // (text[] di Supabase)
  price: string; // Tambahkan price
}

export function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>(); // Mengambil 'id' dari URL
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return; // Jika tidak ada ID, jangan lakukan apa-apa

      setIsLoading(true);
      const { data, error } = await supabase
        .from('produk')
        .select('*')
        .eq('id', id) // Cari produk yang ID-nya cocok
        .single(); // Ambil satu saja

      if (error) {
        console.error('Error fetching product:', error);
      } else if (data) {
        setProduct(data as Product);
      }
      setIsLoading(false);
    }

    fetchProduct();
  }, [id]); // Jalankan efek ini setiap kali 'id' di URL berubah

  // --- Ambil gambar dari 'images' (array) atau 'image' (tunggal) ---
  // Pastikan productImages adalah array yang valid
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : (product?.image ? [product.image] : []); // Fallback ke image utama

  const handleWhatsAppClick = () => {
    if (!product) return;
    const message = encodeURIComponent(`Halo, saya ingin bertanya tentang ${product.title}`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  const handleShopeeClick = () => {
    window.open('https://shopee.co.id', '_blank');
  };

  // Tampilan Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-12 w-12 text-[var(--brand-coklat-sedang)] animate-spin" />
      </div>
    );
  }

  // Tampilan Produk Tidak Ditemukan
  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl text-[var(--netral-abu-abu)]">Produk tidak ditemukan.</p>
      </div>
    );
  }

  // Tampilan Halaman Produk
  return (
    <div className="min-h-screen bg-[var(--netral-putih-bg)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb (gunakan <Link>) */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-[var(--netral-abu-abu)]" style={{ fontSize: '14px' }}>
            <li>
              <Link to="/" className="hover:text-[var(--brand-coklat-tua)] transition-colors">
                Beranda
              </Link>
            </li>
            <ChevronRight className="h-4 w-4" />
            <li>
              <Link to="/produk" className="hover:text-[var(--brand-coklat-tua)] transition-colors">
                Produk
              </Link>
            </li>
            <ChevronRight className="h-4 w-4" />
            <li className="text-[var(--netral-abu-abu)]">{product.category}</li>
            <ChevronRight className="h-4 w-4" />
            <li className="text-[var(--brand-coklat-tua)]" style={{ fontWeight: 500 }}>
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-white border border-[var(--netral-garis-batas)]">
              <ImageWithFallback
                src={productImages[selectedImage] || product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productImages.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[var(--aksen-kuning-cerah)] ring-2 ring-[var(--aksen-kuning-cerah)] ring-offset-2'
                        : 'border-[var(--netral-garis-batas)] hover:border-[var(--brand-coklat-sedang)]'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Information */}
          <div className="space-y-6">
            {/* Category Tag */}
            <div>
              <span className="inline-block px-4 py-2 bg-[var(--brand-coklat-muda)] text-[var(--brand-coklat-sedang)] rounded-full" style={{ fontSize: '14px', fontWeight: 500 }}>
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h2 className="text-[var(--brand-coklat-tua)]">{product.title}</h2>
            
            {/* Price (Tambahkan ini) */}
            <p className="text-3xl font-bold text-[var(--brand-coklat-sedang)]">
              {`Rp ${parseInt(product.price).toLocaleString('id-ID')}`}
            </p>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-[var(--netral-hitam)]">
                {product.description}
              </p>
            </div>

            {/* Key Information Block */}
            <div className="bg-white rounded-lg border border-[var(--netral-garis-batas)] p-6 space-y-4">
              <h3 className="text-[var(--brand-coklat-tua)] pb-2 border-b border-[var(--netral-garis-batas)]">
                Informasi Produk
              </h3>

              {product.ingredients && (
                <div>
                  <h4 className="text-[var(--brand-coklat-sedang)] mb-2">Bahan:</h4>
                  <p className="text-[var(--netral-hitam)]">{product.ingredients}</p>
                </div>
              )}

              {product.nutrition && (
                <div>
                  <h4 className="text-[var(--brand-coklat-sedang)] mb-2">Nilai Gizi:</h4>
                  <p className="text-[var(--netral-hitam)]">{product.nutrition}</p>
                </div>
              )}

              {product.servingSuggestion && (
                <div>
                  <h4 className="text-[var(--brand-coklat-sedang)] mb-2">Saran Penyajian:</h4>
                  <p className="text-[var(--netral-hitam)]">{product.servingSuggestion}</p>
                </div>
              )}

              {product.benefits && product.benefits.length > 0 && (
                <div>
                  <h4 className="text-[var(--brand-coklat-sedang)] mb-2">Manfaat:</h4>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[var(--aksen-kuning-cerah)] flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--netral-hitam)]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <Button fullWidth onClick={handleShopeeClick}>
                <ShoppingCart className="h-5 w-5 mr-2 inline" />
                Beli di Shopee
              </Button>
              <Button fullWidth variant="outline" onClick={handleWhatsAppClick}>
                <MessageCircle className="h-5 w-5 mr-2 inline" />
                Tanya via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}