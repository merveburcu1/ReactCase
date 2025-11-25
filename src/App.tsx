import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductListPage from "./pages/Products/ProductListPage";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import ProductWizard from "./pages/Products/AddProductWizard/ProductWizard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login herkese açık */}
        <Route path="/login" element={<LoginPage />} />

        {/* Korumalı Alan */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/add"
          element={
            <ProtectedRoute>
              <ProductWizard />
            </ProtectedRoute>
          }
        />

        {/* default yönlendirme */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
