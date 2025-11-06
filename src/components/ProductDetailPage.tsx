import { useState, useEffect } from "react";
import { ChevronRight, ShoppingCart, MessageCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/Button"; // Sesuaikan path jika perlu
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link, useParams } from "react-router-dom"; 
// import { supabase } from '../supabaseClient'; // <-- DIHAPUS

// Alamat API Backend Anda
const API_URL = 'https://api-tokoummadzikri.duckdns.org';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  images?: string[]; 
}

export function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>(); 
  const [selectedImage, setSelectedImage] = useState(0);

  // --- (DIUBAH) FUNGSI MENGAMBIL DATA ---
  useEffect(() => {
    async function fetchProduct() {
      if (!id) return; 
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/produk/${id}`);
        if (!response.ok) throw new Error('Produk tidak ditemukan');
        const data = await response.json();
        setProduct(data as Product);
      } catch (error: any) {
        console.error('Error fetching product:', error);
      }
      setIsLoading(false);
    }

    fetchProduct();
  }, [id]); 

  // Sisanya (logika gambar, handle click, JSX) sebagian besar tetap sama
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : (product?.image ? [product.image] : []); 

  const handleWhatsAppClick = () => {
    if (!product) return;
    const message = encodeURIComponent(`Halo, saya ingin bertanya tentang ${product.title}`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  const handleShopeeClick = () => {
    window.open('https://shopee.co.id', '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-12 w-12 text-[var(--brand-coklat-sedang)] animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl text-[var(--netral-abu-abu)]">Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--netral-putih-bg)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb (tetap sama) */}
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

        {/* Main Content (tetap sama) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-white border border-[var(--netral-garis-batas)]">
              <ImageWithFallback
                src={productImages[selectedImage] || product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
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
            <div>
              <span className="inline-block px-4 py-2 bg-[var(--brand-coklat-muda)] text-[var(--brand-coklat-sedang)] rounded-full" style={{ fontSize: '14px', fontWeight: 500 }}>
                {product.category}
              </span>
            </div>
            <h2 className="text-[var(--brand-coklat-tua)]">{product.title}</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-[var(--netral-hitam)]">
                {product.description}
              </p>
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