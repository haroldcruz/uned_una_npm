import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = Router();

// Renderiza login en la vista home
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).render("home/index", {
        title: "Inicio",
        message: "Usuario no encontrado",
        error: "Credenciales inválidas",
        email
      });
    }
    const ok = await bcrypt.compare(password, user.hash || "");
    if (!ok) {
      return res.status(200).render("home/index", {
        title: "Inicio",
        message: "Hola desde MVC con Express + EJS",
        error: "Credenciales inválidas",
        email
      });
    }
    return res.render("home/index", {
      title: "Inicio",
      message: `Bienvenido, ${user.name || user.email}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).render("errors/500", { title: "Error del servidor", error: err });
  }
});

// Ruta opcional de desarrollo para crear usuario de prueba
router.post("/seed", async (req, res) => {
  if (process.env.ALLOW_SEED !== "true") {
    return res.status(403).json({ error: "Seed deshabilitado" });
  }
  const { email, password, nombre = "Usuario", rol = 0 } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Ya existe" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, nombre, rol, hash, mustChangePassword: false });
    return res.json({ ok: true, id: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error" });
  }
});

export default router;
