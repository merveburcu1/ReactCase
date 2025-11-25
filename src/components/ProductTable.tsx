import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";
import { useProductStore } from "../app/store/useProductStore";

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const navigate = useNavigate();
  const removeProduct = useProductStore((s) => s.removeProduct);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      width: 140,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      sortable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation(); // satıra tıklayınca detay sayfasına gitmesini engeller
            removeProduct(params.row.id); // Zustand’dan siler
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => navigate(`/products/${params.id}`)}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
