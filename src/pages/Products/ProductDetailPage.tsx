import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import { useProductStore } from "../../app/store/useProductStore";

export default function ProductDetailPage() {
  const { id } = useParams();                         // URL'den id'yi alır
  const navigate = useNavigate();

  const product = useProductStore((s) =>
    s.products.find((p) => p.id === Number(id))
  );                                                  // Ürünü store’dan bulur

  const updateProduct = useProductStore((s) => s.updateProduct);

  // Ürünü bulamazsa listeye döndür
  if (!product) {
    return (
      <Box p={4}>
        <Typography variant="h5">Product not found</Typography>
        <Button onClick={() => navigate("/products")}>Back</Button>
      </Box>
    );
  }

  // Inline edit için local state – optimistic update
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
  });

  // Her değişiklikte hem local state hem store güncellenecek
  const handleChange = (field: keyof typeof form, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
    updateProduct(product.id, { [field]: value });    // optimistic update
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Product Detail
      </Typography>

      <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
        
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <TextField
          label="Category"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
        />

        <Button variant="outlined" onClick={() => navigate("/products")}>
          Back to List
        </Button>
      </Paper>
    </Box>
  );
}
