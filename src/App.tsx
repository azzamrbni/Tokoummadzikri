import React, { useState, useEffect } from 'react'; // <-- Import useState & useEffect
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SplashScreen } from './components/SplashScreen'; // <-- Import SplashScreen
// import { Footer } from './components/Footer'; // (Jika Anda punya Footer)

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasikan waktu loading (misal: 1.5 detik)
    // Anda bisa sesuaikan angkanya, atau ganti dengan logika loading data asli
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1500ms = 1.5 detik

    // Bersihkan timer saat komponen unmount
    return () => clearTimeout(timer);
  }, []); // [] berarti useEffect ini hanya berjalan 1x saat app dibuka

  // --- LOGIKA TAMPILAN ---

  // 1. Saat loading, tampilkan SplashScreen
  if (isLoading) {
    return <SplashScreen />;
  }

  // 2. Setelah loading selesai, tampilkan layout aplikasi Anda
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}