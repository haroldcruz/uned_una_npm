// Servidor Express básico para MVC con EJS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar vistas EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static
app.use(express.static(path.join(__dirname, "public")));

// Nota: no forzamos Content-Type globalmente para permitir servir imágenes/CSS correctamente

// Parseo de cuerpo para forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a MongoDB Atlas
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.warn("MONGO_URI no está definido. Configure la variable de entorno.");
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((err) => console.error("Error conectando a MongoDB Atlas", err));
}

// Rutas
import indexRouter from "./routes/index.js";
app.use("/", indexRouter);
import authRouter from "./routes/auth.js";
app.use("/auth", authRouter);

// Favicon placeholder para evitar 500 si no existe archivo
app.get("/favicon.ico", (req, res) => res.status(204).end());

// 404
app.use((req, res) => {
  res.status(404).render("errors/404", { title: "Página no encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("errors/500", { title: "Error del servidor", error: err });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
