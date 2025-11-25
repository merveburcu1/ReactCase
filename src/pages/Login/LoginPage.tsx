import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuthStore } from "../../app/store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LockOutlineIcon from '@mui/icons-material/LockOutline';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (values: LoginForm) => {
    if (!values.email || !values.password) return;
    login();
    navigate("/products", { replace: true });
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
       
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width={300}
        p={4}
        border="1px solid #ddd"
        borderRadius={2}
        boxShadow="0 0 10px rgba(0,0,0,0.1)"
      >
         <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
  <LockOutlineIcon/>
  <Typography variant="h5">Login</Typography>
</Box>

        <TextField
          label="Email"
          {...register("email", { required: "Email boş bırakılamaz" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Şifre"
          type="password"
          {...register("password", { required: "Şifre boş bırakılamaz" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Giriş Yap
        </Button>
      </Box>
    </Box>
  );
}
