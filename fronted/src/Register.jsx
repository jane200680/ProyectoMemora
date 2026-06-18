import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import img1 from "./assets/Registroimagen.jpg";
import img2 from "./assets/foto2.jpg";
import img3 from "./assets/foto3.jpg";
import logo from "./assets/logo.png";
import img4 from "./assets/foto4.jpg";
import img5 from "./assets/foto5.jpg";
import img6 from "./assets/foto6.jpg";
import img7 from "./assets/foto7.jpg";
import img8 from "./assets/foto8.png"

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

function Register() {
  const [currentImage, setCurrentImage] = useState(0);

  const [form, setForm] = useState({
    nombre_usuario: "",
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    confirmar: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.contrasena !== form.confirmar) {
      setTipoMensaje("error");
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_usuario: form.nombre_usuario,
          nombres: form.nombres,
          apellidos: form.apellidos,
          correo: form.correo,
          contrasena: form.contrasena,
        }),
      });

      const data = await res.json();
      setTipoMensaje(res.ok ? "success" : "error");
      setMensaje(data.message);
    } catch {
      setTipoMensaje("error");
      setMensaje("No se pudo conectar con el servidor");
    }
  };

  const inputStyle = {
    mb: 1.5,
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "#FFFFFF",
      height: 48,
      "& fieldset": { borderColor: "#D1D5DB" },
      "&:hover fieldset": { borderColor: "#00498D" },
      "&.Mui-focused fieldset": {
        borderColor: "#00498D",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": { color: "#475569" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#00498D" },
    "& .MuiInputBase-input": { color: "#111827" },
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F5F7FA" }}>
      <Box
        sx={{
          height: 70,
          backgroundColor: "#003B7A",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 10 },
        }}
      >
        <img
          src={logo}
          alt="Logo Catamayo"
          style={{ height: "55px", objectFit: "contain" }}
        />

        <Typography
          sx={{
            color: "#fff",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: "0.85rem",
          }}
        >
          Conservando la cultura e identidad de Catamayo - Abg. Janet Guerrero Alcaldesa
        </Typography>
      </Box>

      <Box
        sx={{
          height: 58,
          backgroundColor: "#064B93",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          fontFamily: "'Poppins', sans-serif",
          justifyContent: "center",
          gap: 5,
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        <span>INICIO</span>
        <span>CATEGORÍAS</span>
        <span>LUGARES CULTURALES</span>
        <span>PUBLICACIONES</span>
        <span>INICIAR SESIÓN</span>
      </Box>

      <Box
        sx={{
          minHeight: "calc(100vh - 128px)",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "60% 40%" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            minHeight: { xs: 280, md: "calc(100vh - 128px)" },
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Imagen cultural ${index + 1}`}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: index === currentImage ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            backgroundColor: "#F5F7FA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, md: 4 },
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 430,
              borderRadius: 4,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 14px 35px rgba(0,0,0,0.18)",
              borderTop: "6px solid #38A84A",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  textAlign: "center",
                  fontWeight: 900,
                  color: "#003B7A",
                  mb: 1,
                }}
              >
                Registro
              </Typography>

              <Typography
                sx={{
                  textAlign: "center",
                  color: "#64748B",
                  fontFamily: "'Poppins', sans-serif",
                  mb: 2.5,
                  fontSize: 14,
                }}
              >
                Crea tu cuenta para compartir contenido cultural
              </Typography>

              {mensaje && (
                <Alert severity={tipoMensaje} sx={{ mb: 2, borderRadius: 2 }}>
                  {mensaje}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField  size="small" fullWidth label="Nombre de usuario" name="nombre_usuario" value={form.nombre_usuario} onChange={handleChange} required sx={inputStyle} />
                <TextField  size="small" fullWidth label="Nombres" name="nombres" value={form.nombres} onChange={handleChange} sx={inputStyle} />
                <TextField  size="small" fullWidth label="Apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} sx={inputStyle} />
                <TextField  size="small" fullWidth label="Correo electrónico" name="correo" type="email" value={form.correo} onChange={handleChange} required sx={inputStyle} />
                <TextField  size="small" fullWidth label="Contraseña" name="contrasena" type="password" value={form.contrasena} onChange={handleChange} required sx={inputStyle} />
                <TextField  size="small" fullWidth label="Confirmar contraseña" name="confirmar" type="password" value={form.confirmar} onChange={handleChange} required sx={inputStyle} />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 1,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 900,
                    backgroundColor: "#38A84A",
                    "&:hover": { backgroundColor: "#2E8B57" },
                  }}
                >
                  REGISTRARSE
                </Button>

                <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, fontFamily: "'Poppins', sans-serif" }}>
                  ¿Ya tienes cuenta?{" "}
                  <span style={{ color: "#003B7A", fontWeight: 800 }}>
                    Iniciar sesión
                  </span>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;