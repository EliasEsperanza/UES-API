import { Router } from "express";
import { getAulasVideos, getAulaVideoById, getVideoByAulaId } from "../controllers/Aula_video.controller.js";

const router = new Router();

// Ruta que obtiene todos los videos de un aula
router.get('/aula_video/:aula_id/videos', getVideoByAulaId);

// Ruta que obtiene una relación específica entre aula y video
router.get('/aula_video/:aula_id/:video_id', getAulaVideoById);

// Ruta que obtiene todas las relaciones aula-video
router.get('/aula_video', getAulasVideos);

export default router;