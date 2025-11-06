import React, { useState, useEffect } from "react";
import { InputField } from "./InputField";
import { Button } from "./ui/Button"; // Sesuaikan path jika perlu
import { Plus, Edit, Trash2, X, Loader2, UploadCloud, Image } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Navbar } from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabaseClient'; // <-- DIHAPUS

// Alamat API Backend Anda di DigitalOcean
const API_URL = 'https://api-tokoummadzikri.duckdns.org';

// Interface Produk (tetap sama)
interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  images?: string[];
}

type ProductFormData = Omit<Product, 'id' | 'created_at'>;

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState<ProductFormData>({
    title: "", description: "", price: "", category: "", image: "", images: []
  });
  
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const { logout } = useAuth();
  const navigate = useNavigate();

  const categories = ["Souvenir", "Pakaian", "Makanan & Minuman"];

  // --- (DIUBAH) FUNGSI MENGAMBIL DATA ---
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/produk`);
      if (!response.ok) throw new Error('Gagal mengambil data produk');
      const data = await response.json();
      setProducts(data as Product[]);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      alert(error.message);
    }
    setIsLoading(false);
  }
  
  // --- FUNGSI MODAL (Sebagian besar tetap sama) ---
  const resetModalState = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ title: "", description: "", price: "", category: "", image: "", images: [] });
    filePreviews.forEach(url => URL.revokeObjectURL(url));
    setUploadingFiles([]);
    setFilePreviews([]);
  }

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ title: "", description: "", price: "", category: categories[0], image: "", images: [] });
    setUploadingFiles([]);
    setFilePreviews([]);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      images: product.images || []
    });
    setUploadingFiles([]); 
    setFilePreviews(product.images || (product.image ? [product.image] : [])); 
    setShowModal(true);
  };

  // --- (DIUBAH) FUNGSI HAPUS ---
  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const response = await fetch(`${API_URL}/produk/${id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) throw new Error('Gagal menghapus produk');
  
        setProducts(products.filter(p => p.id !== id));
      } catch (error: any) {
        console.error('Error deleting product:', error);
        alert(error.message);
      }
    }
  };

  // --- FUNGSI SAAT FILE DIPILIH (Tetap sama) ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filePreviews.forEach(url => URL.revokeObjectURL(url));
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setUploadingFiles(files); 
      const previewUrls = files.map(file => URL.createObjectURL(file));
      setFilePreviews(previewUrls);
    } else {
      setUploadingFiles([]);
      setFilePreviews([]);
    }
  }

  // --- (DIUBAH TOTAL) FUNGSI SUBMIT MODAL ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; 
    setIsSubmitting(true);

    try {
      // 1. Buat FormData
      // FormData adalah cara untuk mengirim file + teks ke API
      const data = new FormData();
      
      // 2. Tambahkan semua data teks
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      // (Tambahkan kolom lain jika ada, misal ingredients, benefits)

      // 3. Tambahkan semua file BARU
      uploadingFiles.forEach(file => {
        data.append('files', file); // 'files' harus cocok dengan `upload.array('files')` di server
      });

      // 4. Jika MENGEDIT dan TIDAK ADA file baru, kita harus kirim URL lama
      if (editingProduct && uploadingFiles.length === 0) {
        data.append('image', formData.image);
        (formData.images || []).forEach(imgUrl => {
          data.append('images', imgUrl);
        });
      }

      // 5. Kirim ke API (POST untuk Tambah, PUT untuk Edit)
      let response: Response;
      if (editingProduct) {
        // --- LOGIKA UPDATE (EDIT) ---
        response = await fetch(`${API_URL}/produk/${editingProduct.id}`, {
          method: 'PUT',
          body: data, // Kirim FormData
          // JANGAN set 'Content-Type', browser akan otomatis
        });

        if (!response.ok) throw new Error('Gagal meng-update produk');

        const updatedProduct = await response.json();
        setProducts(products.map(p => (p.id === editingProduct.id ? updatedProduct : p)));

      } else {
        // --- LOGIKA INSERT (TAMBAH BARU) ---
        if (uploadingFiles.length === 0) {
          alert("Silakan pilih gambar produk.");
          setIsSubmitting(false);
          return;
        }

        response = await fetch(`${API_URL}/produk`, {
          method: 'POST',
          body: data, // Kirim FormData
        });

        if (!response.ok) throw new Error('Gagal menambah produk');

        const newProduct = await response.json();
        setProducts([newProduct, ...products]);
      }

      resetModalState();

    } catch (error: any) {
      console.error('Error submitting product:', error);
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Sisa fungsi (formatPrice, handleLogout) tetap sama ---
  const formatPrice = (price: string) => {
    if (!price) return "Rp 0";
    return `Rp ${parseInt(price).toLocaleString('id-ID')}`;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- JSX (Tampilan) tidak ada perubahan ---
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--netral-putih-bg)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-[var(--brand-coklat-tua)] mb-2">Admin Dashboard</h1>
              <p className="text-[var(--netral-abu-abu)]">Kelola produk toko Anda</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleLogout} variant="outline">Logout</Button>
              <Button onClick={handleAdd}><Plus className="h-5 w-5 mr-2 inline" />Tambah Produk Baru</Button>
            </div>
          </div>

          {/* Tabel Produk */}
          <div className="bg-white rounded-lg border border-[var(--netral-garis-batas)] overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-12 w-12 text-[var(--brand-coklat-sedang)] animate-spin" />
                </div>
              ) : (
                <table className="w-full">
                  {/* thead */}
                  <thead className="bg-[var(--brand-coklat-muda)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Gambar</th>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Nama Produk</th>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Kategori</th>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Harga</th>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Aksi</th>
                    </tr>
                  </thead>
                  {/* tbody */}
                  <tbody>
                    {products.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-12 text-[var(--netral-abu-abu)]">Belum ada produk.</td></tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.id} className="border-t border-[var(--netral-garis-batas)] hover:bg-[var(--brand-coklat-muda)] transition-colors">
                          <td className="px-6 py-4">
                            <div className="w-16 h-16 rounded overflow-hidden bg-[var(--brand-coklat-muda)]">
                              <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover"/>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-[var(--netral-hitam)]" style={{ fontWeight: 600 }}>{product.title}</p>
                              <p className="text-sm text-[var(--netral-abu-abu)] max-w-xs truncate">{product.description}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[var(--netral-abu-abu)]">{product.category}</td>
                          <td className="px-6 py-4 text-[var(--brand-coklat-sedang)]" style={{ fontWeight: 600 }}>{formatPrice(product.price)}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(product)} className="p-2 rounded hover:bg-[var(--aksen-kuning-cerah)] transition-colors" title="Edit">
                                <Edit className="h-4 w-4 text-[var(--brand-coklat-sedang)]" />
                              </button>
                              <button onClick={() => handleDelete(product.id)} className="p-2 rounded hover:bg-red-100 transition-colors" title="Hapus">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Modal Tambah/Edit */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header Modal */}
                <div className="p-6 border-b border-[var(--netral-garis-batas)] flex justify-between items-center sticky top-0 bg-white">
                  <h3 className="text-[var(--brand-coklat-tua)]">
                    {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                  </h3>
                  <button onClick={resetModalState} className="p-2 rounded hover:bg-[var(--brand-coklat-muda)] transition-colors">
                    <X className="h-5 w-5 text-[var(--netral-abu-abu)]" />
                  </button>
                </div>
                
                {/* Form Modal */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  
                  <InputField
                    label="Nama Produk"
                    placeholder="Masukkan nama produk"
                    value={formData.title}
                    onChange={(value) => setFormData({ ...formData, title: value })}
                  />
                  <div>
                    <label className="block mb-2 text-[var(--netral-hitam)]" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>Deskripsi</label>
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
                    <label className="block mb-2 text-[var(--netral-hitam)]" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>Kategori</label>
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
                  {/* (Anda bisa tambahkan input 'benefits', 'ingredients' dll di sini) */}

                  {/* Input File Gambar */}
                  <div>
                    <label className="block mb-2 text-[var(--netral-hitam)]" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                      Gambar Produk
                    </label>
                    {/* Area Preview */}
                    <div className="flex flex-wrap gap-3 mb-3">
                      {filePreviews.length > 0 ? (
                        filePreviews.map((previewUrl, index) => (
                          <div key={index} className="w-24 h-24 rounded-lg border border-[var(--netral-garis-batas)] flex items-center justify-center bg-[var(--netral-putih-bg)] overflow-hidden">
                            <img src={previewUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))
                      ) : (
                        <div className="w-24 h-24 rounded-lg border border-[var(--netral-garis-batas)] flex items-center justify-center bg-[var(--netral-putih-bg)] overflow-hidden">
                          <Image className="w-10 h-10 text-[var(--netral-abu-abu)]" />
                        </div>
                      )}
                    </div>
                    {/* Tombol Upload */}
                    <label htmlFor="file-upload" className="w-full cursor-pointer p-4 rounded-lg border-2 border-dashed border-[var(--netral-garis-batas)] hover:border-[var(--brand-coklat-sedang)] text-[var(--netral-abu-abu)] hover:text-[var(--brand-coklat-sedang)] transition-colors flex flex-col items-center justify-center text-center">
                      <UploadCloud className="w-6 h-6 mb-1" />
                      <span className="text-sm">{uploadingFiles.length > 0 ? `${uploadingFiles.length} file dipilih` : "Pilih satu atau lebih file..."}</span>
                    </label>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      multiple 
                      onChange={handleFileChange} 
                    />
                    {editingProduct && uploadingFiles.length === 0 && (
                      <p className="text-xs text-[var(--netral-abu-abu)] mt-2">Kosongkan jika tidak ingin mengganti gambar.</p>
                    )}
                  </div>
                  
                  {/* Tombol Submit/Batal */}
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" fullWidth disabled={isSubmitting}>
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        editingProduct ? 'Update Produk' : 'Tambah Produk'
                      )}
                    </Button>
                    <Button type="button" variant="outline" fullWidth onClick={resetModalState} disabled={isSubmitting}>
                      Batal
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}