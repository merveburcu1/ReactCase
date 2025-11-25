import { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Step1Basic from "./Step1Basic";
import Step3Summary from "./Step3Summary";

import { useProductStore } from "../../../app/store/useProductStore";
import type { WizardProduct } from "../../../types/WizardProduct";
import Step2Price from "./Step2Price";


export default function ProductWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<WizardProduct>({
    name: "",
    description: "",
    category: "",
    price: 0,
    discount: 0,
    currency: "TRY",
  });

  const addProduct = useProductStore((s) => s.addProduct);
  const navigate = useNavigate();

  const steps = ["Temel Bilgiler", "Fiyatlandırma", "Özet"];

  const next = () => setActiveStep((p) => p + 1);
  const back = () => setActiveStep((p) => p - 1);

  const handleSave = () => {
    addProduct({ id: Date.now(), ...formData });

    navigate("/products", { replace: true });
  };

  return (
    <Box
      p={4}
      maxWidth={600}
      mx="auto"
      border={1}
      borderRadius={2}
      boxShadow={3}
    >
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Step1Basic data={formData} setData={setFormData} />
      )}

      {activeStep === 1 && (
        <Step2Price data={formData} setData={setFormData} />
      )}

      {activeStep === 2 && <Step3Summary data={formData} />}

      <Box mt={3} display="flex" gap={2}>
        {activeStep > 0 && <Button onClick={back}>Geri</Button>}

        {activeStep < steps.length - 1 && (
          <Button variant="contained" onClick={next}>
            İleri
          </Button>
        )}

        {activeStep === steps.length - 1 && (
          <Button variant="contained" color="success" onClick={handleSave}>
            Kaydet
          </Button>
        )}
      </Box>
    </Box>
  );
}
