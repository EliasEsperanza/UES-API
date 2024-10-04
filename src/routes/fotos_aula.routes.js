import { Router } from "express";
import { getFotosAulas, getFotosAulasById, getFotosByAulaId } from "../controllers/Aula_fotos.controller.js";

const router = new Router();

router.get('/aula_fotos', getFotosAulas);
router.get('/aula_fotos/:aula_id/:foto_id', getFotosAulasById);
router.get('/aula_fotos/:aula_id', getFotosByAulaId);

export default router;
