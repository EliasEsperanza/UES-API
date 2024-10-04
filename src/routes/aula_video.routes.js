import { Router } from "express";
import { getAulasVideos, getAulaVideoById, getVideoByAulaId } from "../controllers/Aula_video.controller.js";
import router from "./aula_referencia.routes";

const router = new Router();

router.get('/aula_video', getAulasVideos);
router.get('/aula_video/:aula_id/:video_id', getAulaVideoById);
router.get('/aula_video/:aula_id/videos', getVideoByAulaId);

export default router;