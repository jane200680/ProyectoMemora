import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { db } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { nombre_usuario, nombres, apellidos, correo, contrasena } = req.body;

  if (!nombre_usuario || !correo || !contrasena) {
    return res.status(400).json({ message: "Completa los campos obligatorios" });
  }

  try {
    const [existe] = await db.execute(
      "SELECT id_usuario FROM usuario WHERE correo = ? OR nombre_usuario = ?",
      [correo, nombre_usuario]
    );

    if (existe.length > 0) {
      return res.status(409).json({ message: "Correo o usuario ya registrado" });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    await db.execute(
      `INSERT INTO usuario 
      (nombre_usuario, nombres, apellidos, correo, contrasena_hash)
      VALUES (?, ?, ?, ?, ?)`,
      [nombre_usuario, nombres, apellidos, correo, hash]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});