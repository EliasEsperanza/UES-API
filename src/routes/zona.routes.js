import { Router } from "express";
import { getZonaById, getZonas, createZona, deleteZonaById, updateZonaById } from "../controllers/Zonas.controller";

const router = Router();

router.get('/zonas', getZonas);
router.post('/zonas', createZona);
router.delete('/zonas/:id', deleteZonaById);
router.get('/zonas/:id' ,getZonaById);
router.put('/zonas/:id', updateZonaById);

export default router;