import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

// --- Impor Halaman-Halaman Anda ---
import App from './App'; // Layout utama
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ProductDetailPage } from './components/ProductDetailPage'; // <-- IMPORT BARU

// --- Impor Halaman Admin ---
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

// Definisikan semua rute (URL) di website Anda
const router = createBrowserRouter([
  {
    // Rute Publik (Navbar & Footer tetap ada)
    path: '/',
    element: <App />, 
    children: [
      { path: '/', element: <HomePage /> }, // Prop onNavigate & onProductClick DIHAPUS
      { path: '/produk', element: <ProductsPage /> }, // Prop onProductClick DIHAPUS
      { path: '/produk/:id', element: <ProductDetailPage /> }, // <-- RUTE DETAIL BARU
      { path: '/tentang', element: <AboutPage /> }, 
      { path: '/kontak', element: <ContactPage /> },
      { path: '/admin-login', element: <AdminLoginPage /> },
    ],
  },
  {
    // Rute Admin yang "Tergembok"
    path: '/admin',
    element: <ProtectedRoute />, 
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
    ],
  },
]);

// Render aplikasi Anda
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);