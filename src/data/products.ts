export interface Product {
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
}

export const productsData: Product[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Sajadah Premium",
    description: "Sajadah berkualitas tinggi dengan motif elegan dan bahan yang lembut. Cocok untuk shalat harian maupun hadiah spesial.",
    category: "Sajadah & Perlengkapan Shalat",
    images: [
      "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    ingredients: "100% Polyester premium dengan lapisan anti-slip karet alami",
    benefits: [
      "Bahan lembut dan nyaman",
      "Anti-slip sehingga aman saat shalat",
      "Mudah dilipat dan dibawa",
      "Tahan lama dan tidak mudah kusut"
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Al-Qur'an Terjemah",
    description: "Al-Qur'an dengan terjemahan bahasa Indonesia yang mudah dipahami. Dilengkapi dengan tajwid berwarna dan panduan membaca.",
    category: "Al-Qur'an & Buku Islami",
    images: [
      "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    benefits: [
      "Terjemahan bahasa Indonesia yang akurat",
      "Tajwid berwarna untuk memudahkan bacaan",
      "Kertas berkualitas tinggi",
      "Cover elegan dan tahan lama",
      "Ukuran praktis untuk dibawa"
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Hijab Syar'i",
    description: "Hijab syar'i dengan bahan premium yang nyaman dan adem. Cocok untuk aktivitas sehari-hari maupun acara formal.",
    category: "Pakaian Muslim",
    images: [
      "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    ingredients: "Bahan: Voal Premium (Polyester berkualitas tinggi)",
    benefits: [
      "Bahan adem dan tidak panas",
      "Tidak transparan",
      "Tidak mudah kusut",
      "Jahitan rapi dan kuat",
      "Tersedia berbagai warna"
    ]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlc3xlbnwxfHx8fDE3NjE4Mzk2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Minyak Wangi Non-Alkohol",
    description: "Parfum halal dengan aroma lembut dan tahan lama. Bebas alkohol sehingga aman digunakan untuk ibadah.",
    category: "Wangi-wangian",
    images: [
      "https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlc3xlbnwxfHx8fDE3NjE4Mzk2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlc3xlbnwxfHx8fDE3NjE4Mzk2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlc3xlbnwxfHx8fDE3NjE4Mzk2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlc3xlbnwxfHx8fDE3NjE4Mzk2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    ingredients: "Minyak Esensial Alami, Carrier Oil (Minyak Jojoba), tanpa alkohol",
    servingSuggestion: "Aplikasikan pada pergelangan tangan, leher, atau area pulse point lainnya. Gunakan secukupnya untuk aroma yang tahan lama.",
    benefits: [
      "100% bebas alkohol - halal",
      "Aroma lembut dan menenangkan",
      "Tahan lama hingga 8 jam",
      "Aman untuk kulit sensitif",
      "Kemasan praktis dan travel-friendly"
    ]
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1679493419398-671bc52317e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlcyUyMGZydWl0JTIwcmFtYWRhbnxlbnwxfHx8fDE3NjE5MjcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Kurma Premium",
    description: "Kurma pilihan dari Madinah dengan kualitas terbaik. Manis alami dan kaya nutrisi, cocok untuk berbuka puasa atau camilan sehat.",
    category: "Makanan & Minuman",
    images: [
      "https://images.unsplash.com/photo-1679493419398-671bc52317e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlcyUyMGZydWl0JTIwcmFtYWRhbnxlbnwxfHx8fDE3NjE5MjcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1679493419398-671bc52317e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlcyUyMGZydWl0JTIwcmFtYWRhbnxlbnwxfHx8fDE3NjE5MjcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1679493419398-671bc52317e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlcyUyMGZydWl0JTIwcmFtYWRhbnxlbnwxfHx8fDE3NjE5MjcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1679493419398-671bc52317e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRlcyUyMGZydWl0JTIwcmFtYWRhbnxlbnwxfHx8fDE3NjE5MjcwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    ingredients: "100% Kurma Ajwa asli dari Madinah",
    nutrition: "Per 100g: Energi 282 kkal, Karbohidrat 75g, Serat 8g, Gula alami 66g, Protein 2.5g, Lemak 0.4g. Kaya akan Kalium, Magnesium, dan Vitamin B6.",
    servingSuggestion: "Konsumsi 3-7 butir per hari sebagai camilan sehat atau untuk berbuka puasa. Dapat juga dicampur dengan susu atau yogurt.",
    benefits: [
      "Sumber energi alami yang cepat",
      "Kaya serat untuk pencernaan sehat",
      "Mengandung antioksidan tinggi",
      "Membantu menjaga kesehatan jantung",
      "Cocok untuk ibu hamil dan menyusui"
    ]
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1645067373243-1f44e880961d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Tasbih Kayu",
    description: "Tasbih dari kayu pilihan berkualitas tinggi dengan finishing halus. Nyaman digenggam dan tahan lama.",
    category: "Sajadah & Perlengkapan Shalat",
    images: [
      "https://images.unsplash.com/photo-1645067373243-1f44e880961d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1645067373243-1f44e880961d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1645067373243-1f44e880961d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1645067373243-1f44e880961d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    ingredients: "Kayu Kokka pilihan dengan finishing natural polish",
    benefits: [
      "Kayu berkualitas tinggi",
      "Permukaan halus dan nyaman",
      "33 butir dengan 1 butir induk",
      "Warna natural kayu yang elegan",
      "Tali kuat dan tidak mudah putus"
    ]
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Sajadah Travel",
    description: "Sajadah lipat praktis untuk bepergian. Ringan, kompak, dan mudah dibawa kemana saja.",
    category: "Sajadah & Perlengkapan Shalat",
    images: [
      "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    ingredients: "Microfiber ultra-thin dengan teknologi quick-dry",
    benefits: [
      "Sangat ringan dan tipis",
      "Mudah dilipat dan disimpan",
      "Dilengkapi tas penyimpanan",
      "Cepat kering jika terkena air",
      "Cocok untuk traveling dan kantor"
    ]
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Buku Hadits Pilihan",
    description: "Kumpulan hadits shahih dengan terjemahan dan penjelasan yang mudah dipahami. Cocok untuk pembelajaran dan rujukan.",
    category: "Al-Qur'an & Buku Islami",
    images: [
      "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    benefits: [
      "Hadits-hadits shahih pilihan",
      "Terjemahan bahasa Indonesia",
      "Penjelasan yang mudah dipahami",
      "Indeks topik untuk memudahkan pencarian",
      "Kertas dan cetakan berkualitas"
    ]
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Gamis Katun",
    description: "Gamis nyaman dengan bahan katun premium untuk aktivitas harian. Desain simple namun elegan.",
    category: "Pakaian Muslim",
    images: [
      "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1673908869716-abb13b862661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2xvdGhpbmclMjBoaWphYnxlbnwxfHx8fDE3NjE5MjcwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    ingredients: "Bahan: 100% Katun Combed 30s",
    benefits: [
      "Bahan adem dan menyerap keringat",
      "Tidak gerah untuk aktivitas seharian",
      "Jahitan rapi dan kuat",
      "Desain simpel dan elegan",
      "Mudah dipadukan dengan berbagai hijab"
    ]
  }
];
