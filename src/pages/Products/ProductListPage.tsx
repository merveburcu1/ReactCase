import { useState } from "react";
import { Box, TextField, MenuItem, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ProductTable from "../../components/ProductTable";
import { useProductStore } from "../../app/store/useProductStore";

export default function ProductListPage() {
  const products = useProductStore((s) => s.products);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortField, setSortField] = useState<"name" | "price">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category === "all" ? true : p.category === category
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">ÜRÜNLER</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products/add")}
        >
          Ürün Ekle
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Arama"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Katgori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="all">Hepsi</MenuItem>
          <MenuItem value="Electronics">Elektonik</MenuItem>
          <MenuItem value="Office">Ofis</MenuItem>
          <MenuItem value="Clothing">Giysi</MenuItem>
        </TextField>

        <TextField
          select
          label="Sırala"
          value={sortField}
          onChange={(e) => setSortField(e.target.value as any)}
        >
          <MenuItem value="name">İsim</MenuItem>
          <MenuItem value="price">Fiyat</MenuItem>
        </TextField>

        <TextField
          select
          label="Order"
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value as any)}
        >
          <MenuItem value="asc">Artan Sıralama</MenuItem>
          <MenuItem value="desc">Azalan Sıralama</MenuItem>
        </TextField>
      </Box>

      <ProductTable products={filteredProducts} />
    </Box>
  );
}
