import { Router } from "express";
import { getVideosReferencia,getVideoReferenciaById,getVideoReferenciaByReferenciaId } from "../controllers/Video_Referencia.controller.js";

const router= new Router();

router.get('/video_referencias',getVideosReferencia);
router.get('/video_referencias/:referencia_id/:video_id',getVideoReferenciaById);
router.get('/referencias/:referencia_id/videos',getVideoReferenciaByReferenciaId);

export default router;
