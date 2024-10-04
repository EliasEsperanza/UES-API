import { Router } from "express";
import { getFotosReferencias, getFotoReferenciaById, getFotosByReferenciaId, getReferenciasByFotoId } from "../controllers/FotosReferencias.controller.js";

const router = new Router();

router.get('/fotos_referencias', getFotosReferencias);
router.get('/fotos_referencias/:referencia_id/:foto_id', getFotoReferenciaById);
router.get('/referencias/:referencia_id/fotos', getFotosByReferenciaId);
router.get('/fotos/:foto_id/referencias', getReferenciasByFotoId);

export default router;