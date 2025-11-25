import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import type { WizardProduct } from "../../../types/WizardProduct";

const step1Schema = z.object({
  name: z.string().min(2, "Ürün adı en az 2 karakter olmalıdır"),
  description: z.string().min(5, "Açıklama en az 5 karakter olmalıdır"),
  category: z.string().min(1, "Kategori seçimi zorunludur"),
});

export type Step1Form = z.infer<typeof step1Schema>;

interface Step1BasicProps {
  data: WizardProduct;
  setData: React.Dispatch<React.SetStateAction<WizardProduct>>;
}


export default function Step1Basic({ data, setData }: Step1BasicProps)
 {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
    defaultValues: data,
  });

  const onSubmit = (values: Step1Form) => {
    setData((prev) => ({ ...prev, ...values }))

  };

  return (
    <Box
      component="form"
      onBlur={handleSubmit(onSubmit)} // blurlandığında datayı günceller
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Ürün Adı"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Açıklama"
        multiline
        minRows={3}
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <TextField
        label="Kategori"
        {...register("category")}
        error={!!errors.category}
        helperText={errors.category?.message}
      />
    </Box>
  );
}
