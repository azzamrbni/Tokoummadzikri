import { useState } from "react";
import { ChevronRight, ShoppingCart, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "./Button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductDetailProps {
  product: {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    images?: string[];
    ingredients?: string;
    nutrition?: string;
    servingSuggestion?: string;
    benefits?: string[];
  };
  onNavigate: (page: string) => void;
}

export function ProductDetailPage({ product, onNavigate }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Default images if not provided
  const productImages = product.images || [product.image, product.image, product.image];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Halo, saya ingin bertanya tentang ${product.title}`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  const handleShopeeClick = () => {
    // In real implementation, this would link to actual Shopee product
    window.open('https://shopee.co.id', '_blank');
  };

  return (
    <div className="min-h-screen bg-[var(--netral-putih-bg)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-[var(--netral-abu-abu)]" style={{ fontSize: '14px' }}>
            <li>
              <button 
                onClick={() => onNavigate('home')} 
                className="hover:text-[var(--brand-coklat-tua)] transition-colors"
              >
                Beranda
              </button>
            </li>
            <ChevronRight className="h-4 w-4" />
            <li>
              <button 
                onClick={() => onNavigate('products')} 
                className="hover:text-[var(--brand-coklat-tua)] transition-colors"
              >
                Produk
              </button>
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
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
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

            {/* Quality Guarantee */}
            <div className="bg-[var(--brand-coklat-muda)] rounded-lg p-4 border-l-4 border-[var(--aksen-kuning-cerah)]">
              <p className="text-[var(--brand-coklat-tua)]" style={{ fontWeight: 500 }}>
                ✓ Stok kami selalu baru & dicek berkala
              </p>
              <p className="text-[var(--netral-abu-abu)] mt-1">
                Untuk info tanggal kedaluwarsa pasti, silakan chat kami melalui WhatsApp.
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

            {/* Additional Info */}
            <div className="pt-4 border-t border-[var(--netral-garis-batas)]">
              <p className="text-[var(--netral-abu-abu)] text-center">
                Produk 100% halal dan berkualitas
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section (Optional) */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[var(--brand-coklat-tua)]">Produk Terkait</h3>
            <button 
              onClick={() => onNavigate('products')}
              className="text-[var(--brand-coklat-sedang)] hover:text-[var(--brand-coklat-tua)] transition-colors"
              style={{ fontWeight: 500 }}
            >
              Lihat Semua →
            </button>
          </div>
          <p className="text-[var(--netral-abu-abu)]">
            Temukan produk lain dari kategori {product.category}
          </p>
        </div>
      </div>
    </div>
  );
}
