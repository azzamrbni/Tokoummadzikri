import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { ProductsPage } from "./components/ProductsPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { Footer } from "./components/Footer";
import { productsData } from "./data/products";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage("product-detail");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} onProductClick={handleProductClick} />;
      case "products":
        return <ProductsPage onProductClick={handleProductClick} />;
      case "product-detail":
        const product = productsData.find(p => p.id === selectedProductId);
        if (product) {
          return <ProductDetailPage product={product} onNavigate={setCurrentPage} />;
        }
        return <HomePage onNavigate={setCurrentPage} onProductClick={handleProductClick} />;
      case "admin":
        return <AdminDashboard />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} onProductClick={handleProductClick} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
