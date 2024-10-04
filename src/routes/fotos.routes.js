import { Router } from "express";
import { getFotosById, getFotos } from "../controllers/fotos_controller.js";

const router = Router();

router.get('/fotos', getFotos);
router.get('/fotos/:id', getFotosById);

export default router;