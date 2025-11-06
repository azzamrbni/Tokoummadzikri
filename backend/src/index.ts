import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { supabase } from './supabaseClient';

// --- Setup ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Middleware ---
app.use(cors());
app.use(express.json());

// ========================
// --- RUTE (ENDPOINT) ANDA ---
// ========================

app.get('/', (req, res) => {
  res.send('Halo! Ini adalah Backend Toko Umma Dzikri 🚀');
});

// ------------------------
// --- RUTE PRODUK (READ) ---
// ------------------------

// GET /produk (Ambil SEMUA produk)
app.get('/produk', async (req, res) => {
  console.log('Menerima permintaan GET /produk');
  try {
    const { data, error } = await supabase
      .from('produk')
      .select('*')
      .order('id', { ascending: false });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /produk/:id (Ambil SATU produk)
app.get('/produk/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Menerima permintaan GET /produk/${id}`);
  try {
    const { data, error } = await supabase
      .from('produk')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    if (data) res.status(200).json(data);
    else res.status(404).json({ error: 'Produk tidak ditemukan' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------------------
// --- RUTE PRODUK (CREATE) ---
// ---------------------------

// POST /produk (Tambah produk BARU)
app.post('/produk', upload.array('files'), async (req, res) => {
  console.log('Menerima permintaan POST /produk');
  const files = req.files as Express.Multer.File[];
  const body = req.body;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'Tidak ada file yang di-upload.' });
  }

  try {
    // 1. Upload semua file ke Storage
    const uploadPromises = files.map(file => {
      const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;
      return supabase.storage
        .from('gambar_produk')
        .upload(fileName, file.buffer, { contentType: file.mimetype });
    });
    const uploadResults = await Promise.all(uploadPromises);
    const uploadError = uploadResults.find(result => result.error);
    if (uploadError) throw uploadError.error;

    // 2. Ambil semua URL publik
    const galleryImageUrls = uploadResults.map(result => {
      return supabase.storage.from('gambar_produk').getPublicUrl(result.data!.path).data.publicUrl;
    });
    const mainImageUrl = galleryImageUrls[0]; // Gambar pertama sebagai thumbnail

    // 3. Siapkan data untuk Database
    const productData = {
      title: body.title,
      description: body.description,
      price: body.price,
      category: body.category,
      image: mainImageUrl,
      images: galleryImageUrls,
      ingredients: body.ingredients,
      nutrition: body.nutrition,
      servingSuggestion: body.servingSuggestion,
    };

    // 4. Simpan data ke tabel 'produk'
    const { data: newProduct, error: insertError } = await supabase
      .from('produk')
      .insert(productData)
      .select()
      .single();
    if (insertError) throw insertError;

    res.status(201).json(newProduct);
  } catch (error: any) {
    console.error('Error saat membuat produk:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------
// --- RUTE PRODUK (UPDATE) ---
// ----------------------------

// PUT /produk/:id (Update produk yang ADA)
app.put('/produk/:id', upload.array('files'), async (req, res) => {
  const { id } = req.params;
  console.log(`Menerima permintaan PUT /produk/${id}`);
  const files = req.files as Express.Multer.File[];
  const body = req.body;

  try {
    let mainImageUrl = body.image; // Ambil URL gambar lama dari body
    let galleryImageUrls = body.images ? body.images.split(',') : []; // Ambil array URL lama

    // 1. Cek jika ada file BARU yang di-upload
    if (files && files.length > 0) {
      console.log('Ada file baru, meng-upload...');
      // (Nanti: Hapus file lama di Storage untuk hemat tempat)

      // Upload file baru
      const uploadPromises = files.map(file => {
        const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;
        return supabase.storage
          .from('gambar_produk')
          .upload(fileName, file.buffer, { contentType: file.mimetype });
      });
      const uploadResults = await Promise.all(uploadPromises);
      const uploadError = uploadResults.find(result => result.error);
      if (uploadError) throw uploadError.error;

      // Ambil URL publik baru
      galleryImageUrls = uploadResults.map(result => {
        return supabase.storage.from('gambar_produk').getPublicUrl(result.data!.path).data.publicUrl;
      });
      mainImageUrl = galleryImageUrls[0];
    }

    // 2. Siapkan data untuk di-update
    const productData = {
      title: body.title,
      description: body.description,
      price: body.price,
      category: body.category,
      image: mainImageUrl,
      images: galleryImageUrls,
      ingredients: body.ingredients,
      nutrition: body.nutrition,
      servingSuggestion: body.servingSuggestion,
    };

    // 3. Update data di tabel 'produk'
    const { data: updatedProduct, error: updateError } = await supabase
      .from('produk')
      .update(productData)
      .eq('id', id) // Di mana ID-nya cocok
      .select()
      .single();
    
    if (updateError) throw updateError;

    res.status(200).json(updatedProduct);
  } catch (error: any) {
    console.error('Error saat update produk:', error.message);
    res.status(500).json({ error: error.message });
  }
});


// ----------------------------
// --- RUTE PRODUK (DELETE) ---
// ----------------------------

// DELETE /produk/:id (Hapus produk)
app.delete('/produk/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Menerima permintaan DELETE /produk/${id}`);

  try {
    // (Nanti: Kita juga harus hapus file dari Supabase Storage)
    
    // Hapus data dari database
    const { error } = await supabase
      .from('produk')
      .delete()
      .eq('id', id); // Di mana ID-nya cocok

    if (error) throw error;

    res.status(200).json({ message: 'Produk berhasil dihapus' });
  } catch (error: any) {
    console.error('Error saat menghapus produk:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// --- Menjalankan Server ---
app.listen(PORT, () => {
  console.log(`🔥 Server Backend berjalan di http://localhost:${PORT}`);
});