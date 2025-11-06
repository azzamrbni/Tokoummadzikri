import React, { useState, useEffect } from "react";
import { InputField } from "./InputField";
import { Button } from "./ui/Button"; // Sesuaikan path jika perlu
import { Plus, Edit, Trash2, X, Loader2, UploadCloud, Image } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Navbar } from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

// Interface Produk (pastikan 'images' ada)
interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string; // URL Gambar utama/thumbnail
  images?: string[]; // (text[] di Supabase) Array URL galeri
  ingredients?: string;
  nutrition?: string;
  servingSuggestion?: string;
  benefits?: string[];
}

// Data form, tanpa ID
type ProductFormData = Omit<Product, 'id' | 'created_at'>;

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // State untuk form
  const [formData, setFormData] = useState<ProductFormData>({
    title: "", description: "", price: "", category: "", image: "", images: []
  });
  
  // (DIUBAH) State untuk BANYAK file
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]); // Array untuk preview

  const [isLoading, setIsLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const { logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    "Souvenir",
    "Pakaian",
    "Makanan & Minuman"
  ];

  // --- FUNGSI MENGAMBIL DATA ---
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('produk')
      .select('*')
      .order('id', { ascending: false }); 

    if (error) {
      console.error('Error fetching products:', error);
    } else if (data) {
      setProducts(data as Product[]);
    }
    setIsLoading(false);
  }
  
  // --- FUNGSI MODAL ---
  const resetModalState = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ title: "", description: "", price: "", category: "", image: "", images: [] });
    // (DIUBAH) Bersihkan preview URL yang lama
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
    setFormData({ // Set form dengan data yang ada
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      images: product.images || []
    });
    setUploadingFiles([]); // Reset file upload
    // (DIUBAH) Tampilkan semua gambar yang ada
    setFilePreviews(product.images || (product.image ? [product.image] : [])); 
    setShowModal(true);
  };

  // --- FUNGSI HAPUS (TETAP SAMA) ---
  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      // (Nanti: Hapus juga file dari Storage)
      try {
        const { error } = await supabase.from('produk').delete().eq('id', id); 
        if (error) throw error;
        setProducts(products.filter(p => p.id !== id));
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  // --- (DIUBAH) FUNGSI SAAT FILE DIPILIH (BISA BANYAK) ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Bersihkan preview lama
    filePreviews.forEach(url => URL.revokeObjectURL(url));

    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setUploadingFiles(files); // Simpan File objects
      
      // Buat preview URLs baru
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

    let mainImageUrl: string = formData.image; // URL gambar utama
    let galleryImageUrls: string[] = formData.images || []; // Array URL galeri

    try {
      // 1. CEK JIKA ADA FILE BARU YANG DI-UPLOAD
      if (uploadingFiles.length > 0) {
        
        // Buat array berisi "janji" untuk setiap upload
        const uploadPromises = uploadingFiles.map(file => {
          const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
          return supabase.storage
            .from('gambar_produk') // Bucket Anda
            .upload(fileName, file);
        });

        // Jalankan semua "janji" upload secara bersamaan
        const uploadResults = await Promise.all(uploadPromises);

        // Cek jika ada error saat upload
        const uploadError = uploadResults.find(result => result.error);
        if (uploadError) throw uploadError.error;

        // Ambil semua URL publik dari hasil upload
        galleryImageUrls = uploadResults.map(result => {
          const { data } = supabase.storage
            .from('gambar_produk')
            .getPublicUrl(result.data!.path); // Ambil path dari data hasil upload
          return data.publicUrl;
        });

        // Set gambar utama (thumbnail) sebagai gambar pertama dari yg di-upload
        mainImageUrl = galleryImageUrls[0];
      }

      // 2. SIAPKAN DATA UNTUK DATABASE
      const productData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        image: mainImageUrl, // Kolom 'image' (thumbnail)
        images: galleryImageUrls, // Kolom 'images' (array galeri)
        // (Tambahkan kolom lain jika perlu)
        ingredients: formData.ingredients,
        nutrition: formData.nutrition,
        servingSuggestion: formData.servingSuggestion,
        benefits: formData.benefits
      };

      // 3. KIRIM DATA KE TABEL 'produk'
      if (editingProduct) {
        // --- LOGIKA UPDATE (EDIT) ---
        const { data, error } = await supabase
          .from('produk')
          .update(productData)
          .eq('id', editingProduct.id)
          .select() 
          .single();
        
        if (error) throw error;
        setProducts(products.map(p => (p.id === editingProduct.id ? data : p)));

      } else {
        // --- LOGIKA INSERT (TAMBAH BARU) ---
        const { data, error } = await supabase
          .from('produk')
          .insert(productData)
          .select()
          .single();

        if (error) throw error;
        setProducts([data, ...products]);
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--netral-putih-bg)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... Header (tetap sama) ... */}
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

          {/* ... Tabel Produk (tetap sama) ... */}
          <div className="bg-white rounded-lg border border-[var(--netral-garis-batas)] overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-12 w-12 text-[var(--brand-coklat-sedang)] animate-spin" />
                </div>
              ) : (
                <table className="w-full">
                  {/* ... thead ... */}
                  <thead className="bg-[var(--brand-coklat-muda)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Gambar</th>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Nama Produk</th>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Kategori</th>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Harga</th>
                      <th className="px-6 py-4 text-left text-[var(--brand-coklat-tua)]" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Aksi</th>
                    </tr>
                  </thead>
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

          {/* --- MODAL (SUDAH DI-UPGRADE DENGAN UPLOAD FILE) --- */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-[var(--netral-garis-batas)] flex justify-between items-center sticky top-0 bg-white">
                  <h3 className="text-[var(--brand-coklat-tua)]">
                    {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                  </h3>
                  <button onClick={resetModalState} className="p-2 rounded hover:bg-[var(--brand-coklat-muda)] transition-colors">
                    <X className="h-5 w-5 text-[var(--netral-abu-abu)]" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  
                  {/* ... InputField Nama, textarea Deskripsi, select Kategori, InputField Harga ... */}
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
                  {/* (OPSIONAL) Tambahkan input untuk kolom baru Anda (ingredients, benefits, dll) di sini */}


                  {/* --- (DIUBAH) INPUT FILE GAMBAR (BISA BANYAK) --- */}
                  <div>
                    <label className="block mb-2 text-[var(--netral-hitam)]" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                      Gambar Produk
                    </label>
                    {/* (BARU) Area Preview */}
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
                    {/* (DIUBAH) Tombol Upload */}
                    <label htmlFor="file-upload" className="w-full cursor-pointer p-4 rounded-lg border-2 border-dashed border-[var(--netral-garis-batas)] hover:border-[var(--brand-coklat-sedang)] text-[var(--netral-abu-abu)] hover:text-[var(--brand-coklat-sedang)] transition-colors flex flex-col items-center justify-center text-center">
                      <UploadCloud className="w-6 h-6 mb-1" />
                      <span className="text-sm">{uploadingFiles.length > 0 ? `${uploadingFiles.length} file dipilih` : "Pilih satu atau lebih file..."}</span>
                    </label>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      multiple // <-- ATRIBUT PENTING
                      onChange={handleFileChange} 
                    />
                    {editingProduct && uploadingFiles.length === 0 && (
                      <p className="text-xs text-[var(--netral-abu-abu)] mt-2">Kosongkan jika tidak ingin mengganti gambar.</p>
                    )}
                  </div>
                  {/* ------------------------------------------- */}

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