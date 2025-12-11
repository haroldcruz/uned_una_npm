import { Router } from "express";

const router = Router();

// Controller simulando lógica
const HomeController = {
  index: (req, res) => {
    res.render("home/index", {
      title: "Inicio",
      message: "Hola desde MVC con Express + EJS",
    });
  },
};

router.get("/", HomeController.index);

export default router;
