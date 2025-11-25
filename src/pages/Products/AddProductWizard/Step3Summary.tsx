import { Box, Typography, Divider } from "@mui/material";

interface Step3SummaryProps {
  data: {
    name: string;
    description: string;
    category: string;
    price: number;
    discount?: number;
    currency: string;
  };
}

export default function Step3Summary({ data }: Step3SummaryProps) {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Ürün Özeti
      </Typography>

      <Box mb={2}>
        <Typography variant="subtitle1">Temel Bilgiler</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography><strong>İsim:</strong> {data.name}</Typography>
        <Typography><strong>Açıklama:</strong> {data.description}</Typography>
        <Typography><strong>Kategori:</strong> {data.category}</Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle1">Fiyatlandırma</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography><strong>Fiyat:</strong> {data.price} {data.currency}</Typography>
        <Typography>
          <strong>İndirim:</strong> {data.discount ? `%${data.discount}` : "Yok"}
        </Typography>
      </Box>

      <Typography color="gray">Kaydet tuşuna bastığınızda ürün eklenmiş olacaktır.</Typography>
    </Box>
  );
}
