import { useState } from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Sajadah Premium",
      description: "Sajadah berkualitas tinggi dengan motif elegan",
      price: "150000",
      category: "Sajadah & Perlengkapan Shalat",
      image: "https://images.unsplash.com/photo-1711552587499-34913bb1ad9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBtYXQlMjBtb3NxdWV8ZW58MXx8fHwxNzYxOTI3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Al-Qur'an Terjemah",
      description: "Al-Qur'an dengan terjemahan bahasa Indonesia",
      price: "200000",
      category: "Al-Qur'an & Buku Islami",
      image: "https://images.unsplash.com/photo-1721744671779-c6ade1bc64df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYm9vayUyMHF1cmFufGVufDF8fHx8MTc2MTkyNzAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const categories = [
    "Sajadah & Perlengkapan Shalat",
    "Al-Qur'an & Buku Islami",
    "Pakaian Muslim",
    "Wangi-wangian",
    "Makanan & Minuman"
  ];

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ title: "", description: "", price: "", category: categories[0], image: "" });
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...formData
      };
      setProducts([...products, newProduct]);
    }
    
    setShowModal(false);
    setFormData({ title: "", description: "", price: "", category: "", image: "" });
  };

  const formatPrice = (price: string) => {
    return `Rp ${parseInt(price).toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen bg-[var(--netral-putih-bg)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-[var(--brand-coklat-tua)] mb-2">Admin Dashboard</h1>
            <p className="text-[var(--netral-abu-abu)]">Kelola produk toko Anda</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-5 w-5 mr-2 inline" />
            Tambah Produk Baru
          </Button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-[var(--netral-garis-batas)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--brand-coklat-muda)]">
                <tr>
                  <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                    Gambar
                  </th>
                  <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                    Nama Produk
                  </th>
                  <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                    Harga
                  </th>
                  <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-[var(--netral-garis-batas)] hover:bg-[var(--brand-coklat-muda)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded overflow-hidden bg-[var(--brand-coklat-muda)]">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-[var(--netral-hitam)]" style={{ fontWeight: 600 }}>{product.title}</p>
                        <p className="text-[var(--netral-abu-abu)]">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--netral-abu-abu)]">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-[var(--brand-coklat-sedang)]" style={{ fontWeight: 600 }}>
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 rounded hover:bg-[var(--aksen-kuning-cerah)] transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-[var(--brand-coklat-sedang)]" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded hover:bg-red-100 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-[var(--netral-garis-batas)] flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-[var(--brand-coklat-tua)]">
                  {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded hover:bg-[var(--brand-coklat-muda)] transition-colors"
                >
                  <X className="h-5 w-5 text-[var(--netral-abu-abu)]" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <InputField
                  label="Nama Produk"
                  placeholder="Masukkan nama produk"
                  value={formData.title}
                  onChange={(value) => setFormData({ ...formData, title: value })}
                />
                
                <div>
                  <label className="block mb-2 text-[var(--netral-hitam)]" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Masukkan deskripsi produk"
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-[var(--netral-garis-batas)] rounded-lg text-[var(--netral-hitam)] placeholder:text-[var(--netral-abu-abu)] focus:outline-none focus:ring-2 focus:ring-[var(--aksen-kuning-cerah)] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Montserrat' }}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-[var(--netral-hitam)]" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[var(--netral-garis-batas)] rounded-lg text-[var(--netral-hitam)] focus:outline-none focus:ring-2 focus:ring-[var(--aksen-kuning-cerah)] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <InputField
                  label="Harga (Rp)"
                  placeholder="Masukkan harga"
                  type="number"
                  value={formData.price}
                  onChange={(value) => setFormData({ ...formData, price: value })}
                />

                <InputField
                  label="URL Gambar"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value })}
                />

                <div className="flex gap-3 pt-4">
                  <Button type="submit" fullWidth>
                    {editingProduct ? 'Update Produk' : 'Tambah Produk'}
                  </Button>
                  <Button type="button" variant="outline" fullWidth onClick={() => setShowModal(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
