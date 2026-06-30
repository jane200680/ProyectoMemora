import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import logo from "./assets/logo.png";
import portada from "./assets/Registroimagen.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#FFFFFF" }}>

      {/* ================= HEADER ================= */}

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1565C0",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 8 } }}>

          <img
            src={logo}
            alt="Logo Memora"
            style={{
              width: 60,
              marginRight: 15,
            }}
          />

          <Typography
            sx={{
              flexGrow: 1,
              color: "#FFD400",
              fontWeight: 900,
              fontSize: 32,
            }}
          >
            MEMORA
          </Typography>

          <Button color="inherit">Inicio</Button>

          <Button color="inherit">Patrimonio</Button>

          <Button color="inherit">Galería</Button>

          <Button color="inherit">Nosotros</Button>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              ml: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/Login")}
              sx={{
                borderColor: "#FFD400",
                color: "#FFD400",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,

                "&:hover": {
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                },
              }}
            >
              Ingresar
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/Register")}
              sx={{
                backgroundColor: "#FFD400",
                color: "#1565C0",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,

                "&:hover": {
                  backgroundColor: "#F4C400",
                },
              }}
            >
              Registrarse
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= HERO ================= */}

      <Grid
        container
        sx={{
          minHeight: "85vh",
        }}
      >
        {/* TEXTO */}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 4, md: 8 },
            py: 6,
          }}
        >
          <Box>

            <Typography
              sx={{
                color: "#4CAF50",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              CONSERVANDO EL PATRIMONIO CULTURAL
            </Typography>

            <Typography
              sx={{
                mt: 2,
                mb: 3,
                fontSize: {
                  xs: 38,
                  md: 55,
                },
                fontWeight: 900,
                color: "#1565C0",
                lineHeight: 1.1,
              }}
            >
              Descubre la historia de Catamayo
            </Typography>

            <Typography
              sx={{
                color: "#555",
                fontSize: 18,
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              Memora es una plataforma digital donde la comunidad podrá
              compartir fotografías, historias, tradiciones, lugares
              representativos y recuerdos que forman parte del patrimonio
              cultural del cantón Catamayo.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1565C0",
                  px: 4,
                  py: 1.3,
                  borderRadius: 3,
                  fontWeight: 700,

                  "&:hover": {
                    backgroundColor: "#0D47A1",
                  },
                }}
              >
                Explorar
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  px: 4,
                  py: 1.3,
                  borderRadius: 3,
                  fontWeight: 700,

                  "&:hover": {
                    borderColor: "#2E7D32",
                    color: "#2E7D32",
                  },
                }}
              >
                Publicar Historia
              </Button>
            </Box>

          </Box>
        </Grid>

        {/* IMAGEN */}

        <Grid
          item
          xs={12}
          md={6}
        >
          <Box
            component="img"
            src={portada}
            alt="Catamayo"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>

      </Grid>

      {/* ================= FOOTER ================= */}

      <Box
        sx={{
          backgroundColor: "#1565C0",
          color: "#FFFFFF",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography fontWeight={600}>
          © 2026 MEMORA | Conservando la cultura e identidad de Catamayo
        </Typography>
      </Box>

    </Box>
  );
}