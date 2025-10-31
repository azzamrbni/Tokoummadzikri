import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "./Button";
import { InputField } from "./InputField";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real implementation, this would send to backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", contact: "", message: "" });
    }, 3000);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Halo, saya ingin bertanya tentang produk di Toko Umma Dzikri");
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  const marketplaces = [
    {
      name: "Shopee",
      logo: "🛍️",
      url: "https://shopee.co.id",
      bgColor: "bg-orange-500"
    },
    {
      name: "Tokopedia",
      logo: "🛒",
      url: "https://tokopedia.com",
      bgColor: "bg-green-500"
    },
    {
      name: "TikTok Shop",
      logo: "🎵",
      url: "https://shop.tiktok.com",
      bgColor: "bg-black"
    },
    {
      name: "Instagram",
      logo: "📸",
      url: "https://instagram.com",
      bgColor: "bg-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--netral-putih-bg)]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[var(--brand-coklat-muda)] to-[var(--aksen-oranye-lembut)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[var(--brand-coklat-tua)] mb-4">Hubungi Kami</h1>
          <p className="text-[var(--netral-abu-abu)] max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Kami siap membantu Anda! Hubungi kami melalui berbagai kanal yang tersedia
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-[var(--brand-coklat-tua)] mb-6">Informasi Kontak</h2>
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[var(--netral-garis-batas)]">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[var(--brand-coklat-muda)] flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-[var(--brand-coklat-sedang)]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[var(--brand-coklat-tua)] mb-1">Alamat Toko</h4>
                    <p className="text-[var(--netral-abu-abu)]">
                      Jl. Raya Margonda No. 123<br />
                      Depok, Jawa Barat 16424<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[var(--netral-garis-batas)]">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[var(--aksen-kuning-cerah)] flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-[var(--brand-coklat-tua)]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[var(--brand-coklat-tua)] mb-1">WhatsApp</h4>
                    <p className="text-[var(--netral-abu-abu)] mb-2">+62 812-3456-7890</p>
                    <button
                      onClick={handleWhatsAppClick}
                      className="text-[var(--brand-coklat-sedang)] hover:text-[var(--brand-coklat-tua)] transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      Chat Sekarang →
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[var(--netral-garis-batas)]">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[var(--brand-coklat-muda)] flex items-center justify-center">
                      <Mail className="h-6 w-6 text-[var(--brand-coklat-sedang)]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[var(--brand-coklat-tua)] mb-1">Email</h4>
                    <a 
                      href="mailto:info@tokoummadzikri.com"
                      className="text-[var(--netral-abu-abu)] hover:text-[var(--brand-coklat-sedang)] transition-colors"
                    >
                      info@tokoummadzikri.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[var(--netral-garis-batas)]">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[var(--brand-coklat-muda)] flex items-center justify-center">
                      <Phone className="h-6 w-6 text-[var(--brand-coklat-sedang)]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[var(--brand-coklat-tua)] mb-1">Telepon</h4>
                    <p className="text-[var(--netral-abu-abu)]">(021) 8765-4321</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Hours */}
            <div className="bg-[var(--brand-coklat-muda)] rounded-lg p-6">
              <h3 className="text-[var(--brand-coklat-tua)] mb-4">Jam Operasional</h3>
              <div className="space-y-2 text-[var(--netral-hitam)]">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span style={{ fontWeight: 600 }}>09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu - Minggu</span>
                  <span style={{ fontWeight: 600 }}>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Hari Libur Nasional</span>
                  <span style={{ fontWeight: 600 }}>Tutup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form & Marketplaces */}
          <div className="space-y-8">
            {/* Marketplace Links */}
            <div>
              <h2 className="text-[var(--brand-coklat-tua)] mb-6">Belanja di Platform Kami</h2>
              <p className="text-[var(--netral-abu-abu)] mb-6">
                Temukan produk kami di berbagai platform e-commerce favorit Anda
              </p>
              <div className="grid grid-cols-2 gap-4">
                {marketplaces.map((marketplace, index) => (
                  <a
                    key={index}
                    href={marketplace.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${marketplace.bgColor} text-white rounded-lg p-6 text-center hover:opacity-90 transition-opacity`}
                  >
                    <div className="text-4xl mb-2">{marketplace.logo}</div>
                    <p style={{ fontWeight: 600 }}>{marketplace.name}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-6 border border-[var(--netral-garis-batas)]">
              <h3 className="text-[var(--brand-coklat-tua)] mb-4">Kirim Pesan</h3>
              <p className="text-[var(--netral-abu-abu)] mb-6">
                Punya pertanyaan? Isi form di bawah ini dan kami akan segera menghubungi Anda
              </p>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-green-700" style={{ fontWeight: 500 }}>
                    ✓ Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[var(--netral-hitam)] mb-2" style={{ fontWeight: 500 }}>
                      Nama Lengkap
                    </label>
                    <InputField
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(value) => setFormData({ ...formData, name: value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--netral-hitam)] mb-2" style={{ fontWeight: 500 }}>
                      Email / WhatsApp
                    </label>
                    <InputField
                      placeholder="email@example.com atau 08123456789"
                      value={formData.contact}
                      onChange={(value) => setFormData({ ...formData, contact: value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--netral-hitam)] mb-2" style={{ fontWeight: 500 }}>
                      Pesan
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--netral-garis-batas)] focus:border-[var(--brand-coklat-sedang)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-coklat-sedang)]/20 transition-colors"
                      style={{ fontFamily: 'Montserrat' }}
                    />
                  </div>

                  <Button fullWidth type="submit">
                    <Send className="h-5 w-5 mr-2 inline" />
                    Kirim Pesan
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-[var(--brand-coklat-tua)] mb-6 text-center">Lokasi Toko</h2>
          <div className="bg-white rounded-lg overflow-hidden border border-[var(--netral-garis-batas)] aspect-[16/9]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.23086159262!2d106.7537529!3d-6.4024859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eb5eebbb5c1f%3A0x3207d2f355cd7e77!2sDepok%2C%20Kota%20Depok%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1234567890123!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Toko Umma Dzikri"
            />
          </div>
          <p className="text-center text-[var(--netral-abu-abu)] mt-4">
            Kunjungi toko kami untuk melihat langsung koleksi produk yang tersedia
          </p>
        </div>
      </div>
    </div>
  );
}
