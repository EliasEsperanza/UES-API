import { Router } from "express";
import { getFotosAulas, getFotosAulasById, getFotosByAulaId, getFotosOrdenByAulaId} from "../controllers/Aula_fotos.controller.js";

const router = new Router();

router.get('/aula_fotos', getFotosAulas);
router.get('/aula_fotos/:aula_id/:foto_id', getFotosAulasById);
router.get('/aula_fotos/:aula_id', getFotosByAulaId);
router.get('/aula_foto/OrdenAula', getFotosOrdenByAulaId);
router.get('/aula_foto/:aula_id/OrdenAsc');

export default router;
