import { useState } from "react";
import {
  Box,
 Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("success");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contrasena,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTipo("success");
        setMensaje(data.message);

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setTipo("error");
        setMensaje(data.message);
      }
    } catch {
      setTipo("error");
      setMensaje("No se pudo conectar con el servidor");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F4F8FB",
      }}
    >
      <Card sx={{ width: 420, borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            color="#1565C0"
          >
            Iniciar Sesión
          </Typography>

          <Typography
            textAlign="center"
            sx={{ mb: 3, color: "#666" }}
          >
            Bienvenido a MEMORA
          </Typography>

          {mensaje && (
            <Alert severity={tipo} sx={{ mb: 2 }}>
              {mensaje}
            </Alert>
          )}

          <Box component="form" onSubmit={iniciarSesion}>
            <TextField
              fullWidth
              required
              label="Correo"
              margin="normal"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <TextField
              fullWidth
              required
              label="Contraseña"
              type="password"
              margin="normal"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                background: "#1565C0",
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}