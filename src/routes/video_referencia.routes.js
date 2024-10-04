import { Router } from "express";
import { getVideosReferencia,getVideoReferenciaById,getReferenciaByVideoId, getVideoByReferenciaId } from "../controllers/Video_Referencia.controller.js";

const router= new Router();

router.get('/video_referencias',getVideosReferencia);
router.get('/video_referencias/:referencia_id/:video_id',getVideoReferenciaById);
router.get('/referencias/:referencia_id/videos',getVideoByReferenciaId);
router.get('/videos/:video_id/referencias',getReferenciaByVideoId);

export default router;
