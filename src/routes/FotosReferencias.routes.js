import { Router } from "express";
import { getFotosReferencias, getFotoReferenciaById, getFotosByReferenciaId, getReferenciasByFotoId , getFotosReferenciasOrdenByReferencias, getFotosByReferenciaIdOrdenAsc} from "../controllers/FotosReferencias.controller.js";

const router = new Router();

router.get('/fotos_referencias', getFotosReferencias);
router.get('/fotos_referencias/:referencia_id/:foto_id', getFotoReferenciaById);
router.get('/referencias/:referencia_id/fotos', getFotosByReferenciaId);
router.get('/fotos/:foto_id/referencias', getReferenciasByFotoId);
router.get('/fotos_referencias/ordenByReferencia', getFotosReferenciasOrdenByReferencias);
router.get('/fotos_referencias/:referencias_id/fotos/OrdenAsc', getFotosByReferenciaIdOrdenAsc);

export default router;