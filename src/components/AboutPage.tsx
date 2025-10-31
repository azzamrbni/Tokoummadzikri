import { CheckCircle, MapPin, ShoppingBag, Heart } from "lucide-react";

export function AboutPage() {
  const advantages = [
    {
      icon: MapPin,
      title: "Kami Hadir di Depok",
      description: "Anda tidak perlu lagi mencari ke Jakarta atau Bandung. Kami hadir lebih dekat dengan Anda, menghemat waktu dan ongkos kirim. Lokasi strategis kami memudahkan Anda untuk belanja langsung atau menerima pesanan dengan cepat."
    },
    {
      icon: ShoppingBag,
      title: "Belanja Praktis di Satu Tempat",
      description: "Kami paham repotnya mencari kebutuhan anak di banyak toko. Di sini, Anda bisa membeli makanan, pakaian, dan mainan sekaligus. Cukup sekali checkout untuk hemat ongkir dan menghemat waktu berharga Anda."
    },
    {
      icon: CheckCircle,
      title: "Kualitas Terjamin",
      description: "Semua produk yang kami jual telah melewati seleksi ketat. Kami memastikan produk makanan selalu fresh, tidak mendekati expired, dan aman untuk buah hati Anda. Kepuasan dan kepercayaan Anda adalah prioritas kami."
    },
    {
      icon: Heart,
      title: "Melayani dengan Sepenuh Hati",
      description: "Kami memahami kebutuhan para orang tua. Tim kami siap membantu Anda menemukan produk yang tepat dan menjawab semua pertanyaan Anda dengan ramah dan cepat melalui WhatsApp."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--netral-putih-bg)]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[var(--brand-coklat-muda)] to-[var(--aksen-oranye-lembut)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[var(--brand-coklat-tua)] mb-4">Tentang Kami</h1>
          <p className="text-[var(--netral-abu-abu)] max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Cerita perjalanan Toko Umma Dzikri melayani keluarga Indonesia
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[var(--brand-coklat-tua)] mb-6 text-center">Cerita Kami</h2>
          <div className="space-y-4 text-[var(--netral-hitam)]">
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Berawal dari fokus pada popok, Toko Umma Dzikri berkembang untuk menjawab kebutuhan para ibu. 
              Kami melihat para ibu ingin belanja praktis, sehingga kami melengkapi toko kami dengan pakaian, 
              makanan bergizi, mainan edukatif, hingga kini merchandise islami untuk berbagai keperluan acara 
              keluarga dan keagamaan.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Berlokasi di Depok, kami bangga menjadi bagian dari komunitas lokal dan melayani keluarga-keluarga 
              di sekitar kami. Seiring waktu, kami terus berinovasi untuk memberikan pelayanan terbaik, mulai dari 
              kualitas produk yang selalu kami jaga, hingga kecepatan pengiriman yang menjadi prioritas kami.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Kami memahami bahwa kepercayaan adalah hal yang paling berharga. Oleh karena itu, kami berkomitmen 
              untuk selalu menyediakan produk berkualitas tinggi dengan harga yang terjangkau. Setiap produk dipilih 
              dengan cermat untuk memastikan keamanan dan kenyamanan buah hati Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[var(--netral-putih-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-lg p-8 border border-[var(--netral-garis-batas)]">
              <h3 className="text-[var(--brand-coklat-tua)] mb-4">Visi Kami</h3>
              <p className="text-[var(--netral-hitam)]" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Menjadi toko perlengkapan anak dan keluarga muslim terlengkap, terpercaya, dan terdekat 
                bagi masyarakat Depok dan sekitarnya. Kami ingin menjadi solusi satu pintu untuk semua 
                kebutuhan keluarga Indonesia yang Islami.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-lg p-8 border border-[var(--netral-garis-batas)]">
              <h3 className="text-[var(--brand-coklat-tua)] mb-4">Misi Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[var(--aksen-kuning-cerah)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--netral-hitam)]">Menyediakan produk berkualitas tinggi dengan harga terjangkau</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[var(--aksen-kuning-cerah)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--netral-hitam)]">Memberikan pelayanan ramah dan profesional kepada setiap pelanggan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[var(--aksen-kuning-cerah)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--netral-hitam)]">Menghadirkan kemudahan berbelanja dalam satu tempat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[var(--aksen-kuning-cerah)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--netral-hitam)]">Membangun kepercayaan melalui transparansi dan konsistensi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[var(--brand-coklat-tua)] mb-4">Kenapa Memilih Kami?</h2>
            <p className="text-[var(--netral-abu-abu)] max-w-2xl mx-auto">
              Inilah yang membuat Toko Umma Dzikri menjadi pilihan terbaik untuk keluarga Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-[var(--netral-putih-bg)] rounded-lg p-6 border border-[var(--netral-garis-batas)]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[var(--aksen-kuning-cerah)] flex items-center justify-center">
                      <advantage.icon className="h-6 w-6 text-[var(--brand-coklat-tua)]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[var(--brand-coklat-tua)] mb-2">{advantage.title}</h4>
                    <p className="text-[var(--netral-abu-abu)]" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[var(--brand-coklat-sedang)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h4 className="text-white mb-2">Amanah</h4>
              <p className="text-white/90">
                Menjaga kepercayaan pelanggan dengan produk berkualitas dan pelayanan jujur
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h4 className="text-white mb-2">Berkah</h4>
              <p className="text-white/90">
                Berusaha memberikan manfaat dan keberkahan melalui setiap transaksi
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h4 className="text-white mb-2">Profesional</h4>
              <p className="text-white/90">
                Melayani dengan standar tinggi dan terus berinovasi untuk kepuasan Anda
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
