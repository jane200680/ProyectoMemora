import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { db } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { nombre_usuario, nombre, apellido, correo, contrasena } = req.body;

  if (!nombre_usuario || !nombre || !apellido || !correo || !contrasena) {
    return res.status(400).json({ message: "Completa todos los campos obligatorios" });
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

    const [result] = await db.execute(
      `INSERT INTO usuario (nombre_usuario, nombre, apellido, correo)
       VALUES (?, ?, ?, ?)`,
      [nombre_usuario, nombre, apellido, correo]
    );

    await db.execute(
      `INSERT INTO autenticacion (contrasena_hash, usuario_id_usuario)
       VALUES (?, ?)`,
      [hash, result.insertId]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
app.post("/api/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({
      message: "Completa todos los campos",
    });
  }

  try {
    const [rows] = await db.execute(
      `SELECT
        u.id_usuario,
        u.nombre_usuario,
        u.nombre,
        u.apellido,
        u.correo,
        a.contrasena_hash
      FROM usuario u
      INNER JOIN autenticacion a
      ON u.id_usuario = a.usuario_id_usuario
      WHERE u.correo = ?`,
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos",
      });
    }

    const usuario = rows[0];

    const coincide = await bcrypt.compare(
      contrasena,
      usuario.contrasena_hash
    );

    if (!coincide) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos",
      });
    }

    res.json({
      message: "Inicio de sesión correcto",
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        usuario: usuario.nombre_usuario,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});