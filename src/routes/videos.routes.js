import { Router } from "express";
import { getVideoById, getVideos } from "../controllers/videos.controller.js";

const router = Router();

router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);

export default router;