import { Router } from "express";
import { getFotosReferencias, getFotoReferenciaById, getFotosByReferenciaId, getReferenciasByFotoId , getFotosReferenciasOrdenByReferencias} from "../controllers/FotosReferencias.controller.js";

const router = new Router();

router.get('/fotos_referencias', getFotosReferencias);
router.get('/fotos_referencias/:referencia_id/:foto_id', getFotoReferenciaById);
router.get('/referencias/:referencia_id/fotos', getFotosByReferenciaId);
router.get('/fotos/:foto_id/referencias', getReferenciasByFotoId);
router.get('/foros_referencias/ordenByReferencia', getFotosReferenciasOrdenByReferencias);

export default router;