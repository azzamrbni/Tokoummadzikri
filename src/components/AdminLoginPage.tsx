import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Impor komponen Anda yang sudah ada
import { Button } from './ui/Button'; 
import { InputField } from './InputField'; 

// --- KREDENSIAL ADMIN ---
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "PasswordAmanTokoUmmaDzikri123";
// --------------------

export function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      login(); 
      navigate('/admin/dashboard'); 
    } else {
      setError('Username atau Password salah.');
    }
  };

  return (
    // Latar belakang abu-abu/krem
    <div className="bg-[var(--netral-putih-bg)] py-16 px-4"> 
      <div className="max-w-md mx-auto">
        {/* Kartu login putih */}
        <div className="w-full p-8 space-y-6 bg-white rounded-lg border border-[var(--netral-garis-batas)]">

          <h1 className="text-2xl font-bold text-center text-[var(--brand-coklat-tua)]">
            Admin Dashboard Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[var(--netral-hitam)] mb-2" style={{ fontWeight: 500 }}>
                Username
              </label>
              <InputField
                type="text"
                placeholder="admin"
                value={username}
                onChange={(value: string) => setUsername(value)}
              />
            </div>

            <div>
              <label className="block text-[var(--netral-hitam)] mb-2" style={{ fontWeight: 500 }}>
                Password
              </label>
              <InputField
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(value: string) => setPassword(value)}
              />
            </div>

            {/* --- PERBAIKAN DI SINI ---
               Saya hapus `variant="secondary"` agar tombolnya
               kembali ke style default (yang kuning).
            */}
            <div>
              <button
            type="submit"
            className="px-6 py-3 bg-[var(--aksen-kuning-cerah)] text-[var(--netral-hitam)] rounded-lg transition-all hover:bg-[#F4C020] active:scale-95"
            style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
          >
            Login
          </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}