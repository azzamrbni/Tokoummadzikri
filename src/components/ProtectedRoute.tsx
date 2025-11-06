import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Jika user belum login, lempar ke halaman login
    return <Navigate to="/admin-login" replace />;
  }

  // Jika user sudah login, tampilkan halaman yang dia tuju
  // (Outlet adalah placeholder untuk AdminDashboard Anda)
  return <Outlet />;
}