import { logoutSession, setSession } from "@/redux/slices";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { POSDarkModeButton, POSLink, POSPassField, POSTextField } from "common/components";
import { useAxios } from "common/custom-hooks";
import { LoginDTO, loginDTOEmpty } from "common/dtos";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import logo from "../../assets/logo.svg";
import "./style.css";
export interface LoginProps {}

interface FormValues extends LoginDTO {}
const initialValues: FormValues = { ...loginDTOEmpty };

const Login: React.FC<LoginProps> = () => {
  const theme = useTheme();
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const { login } = useAxios("Login");

  const handleSubmit = async (values: FormValues) => {
    const response = await login(values);
    dispatcher(setSession(response));
    navigate("/");
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    dispatcher(logoutSession());
  }, []);

  return (
    <div className="container">
      <div>
        <img src={logo} alt="Logo" style={{ width: "100%" }} />
      </div>
      <Card sx={{ backgroundColor: theme.palette.background.default }}>
        <POSDarkModeButton />
        <CardContent style={{ width: "60%" }}>
          <Typography
            variant="h3"
            color="text.primary"
            gutterBottom
            style={{ textAlign: "center" }}>
            Iniciar Sesión
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit}>
            <POSTextField keyFormik="username" label="Usuario" formik={formik} />
            <POSPassField keyFormik="password" label="Contraseña" formik={formik} />
            <div style={{ textAlign: "end", fontWeight: "bold" }}>
              <POSLink to="/login">¿Olvidaste tu contraseña?</POSLink>
            </div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              style={{ marginTop: "50px" }}
              disabled={formik.isSubmitting}>
              {formik.isSubmitting ? <CircularProgress size={24} /> : "Iniciar Sesión"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
