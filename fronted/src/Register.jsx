import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({
    nombre_usuario: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setTipoMensaje("success");
        setMensaje("Usuario registrado correctamente");

        setForm({
          nombre_usuario: "",
          nombre: "",
          apellido: "",
          correo: "",
          contrasena: "",
        });
      } else {
        setTipoMensaje("error");
        setMensaje(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setTipoMensaje("error");
      setMensaje("No se pudo conectar con el servidor");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F8FAFC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 460,
          borderRadius: 4,
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
          borderTop: "7px solid #FFD400",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 900,
              color: "#1565C0",
              mb: 1,
            }}
          >
            Crear cuenta
          </Typography>

          <Typography sx={{ textAlign: "center", color: "#64748B", mb: 3 }}>
            Regístrate para compartir memorias culturales
          </Typography>

          {mensaje && (
            <Alert severity={tipoMensaje} sx={{ mb: 2 }}>
              {mensaje}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Nombre de usuario"
              name="nombre_usuario"
              value={form.nombre_usuario}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              required
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              required
              label="Apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              required
              label="Correo"
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              required
              label="Contraseña"
              name="contrasena"
              type="password"
              value={form.contrasena}
              onChange={handleChange}
              margin="normal"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                background: "#1565C0",
                color: "#FFFFFF",
                fontWeight: 800,
                borderRadius: 2,
                "&:hover": {
                  background: "#0D47A1",
                },
              }}
            >
              Registrarse
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                mt: 2,
                color: "#64748B",
                fontSize: 14,
              }}
            >
              ¿Ya tienes cuenta?{" "}
              <span style={{ color: "#4CAF50", fontWeight: 800 }}>
                Iniciar sesión
              </span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}