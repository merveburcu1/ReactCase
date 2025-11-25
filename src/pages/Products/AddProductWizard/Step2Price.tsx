import { z } from "zod";
import { useForm } from "react-hook-form";
import { TextField, Box, MenuItem } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

const priceSchema = z.object({
  price: z.coerce
    .number({ invalid_type_error: "Fiyat sayı olmalıdır" })
    .positive("Fiyat 0'dan büyük olmalıdır"),

  discount: z.coerce
    .number()
    .min(0, "Minimum indirim 0 olabilir")
    .max(100, "Maksimum indirim 100 olabilir")
    .optional(),

  currency: z.string().min(1, "Para birimi seçilmelidir"),
});

export type PriceFormType = z.infer<typeof priceSchema>;

interface Step2PriceProps {
  data: any;
  setData: (d: any) => void;
}

export default function Step2Price({ data, setData }: Step2PriceProps) {
  const form = useForm<PriceFormType>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price: data.price ?? 0,
      discount: data.discount ?? 0,
      currency: data.currency ?? "TRY",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = (values: PriceFormType) => {
    setData({ ...data, ...values });
  };

  return (
    <Box
      component="form"
      onBlur={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        type="number"
        label="Fiyat"
        {...register("price")}
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <TextField
        type="number"
        label="İndirim (%)"
        {...register("discount")}
        error={!!errors.discount}
        helperText={errors.discount?.message}
      />

      <TextField
        select
        label="Para Birimi"
        {...register("currency")}
        error={!!errors.currency}
        helperText={errors.currency?.message}
      >
        <MenuItem value="TRY">TRY</MenuItem>
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
      </TextField>
    </Box>
  );
}
