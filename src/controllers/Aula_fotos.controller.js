import redisClient from "../database/redis.js";
import { FotosAulas } from "../models/Aula_Fotos.js";
import { Aulas } from "../models/Aulas.js";
import { Fotos } from "../models/Fotos.js";

export const getFotosAulas = async (req, res) => {
    try {
        const cachedFotosAulas = await redisClient.get('aula_fotos');
        if (cachedFotosAulas) {
            return res.json({
                data: JSON.parse(cachedFotosAulas)
            });
        }
        
        const fotosaulas = await FotosAulas.findAll({
            include: [{ model: Aulas }, { model: Fotos }]
        });
        
        await redisClient.setEx('aula_fotos', 1800, JSON.stringify(fotosaulas));
        res.json({ data: fotosaulas });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getFotosAulasById = async (req, res) => {
    const { aula_id, foto_id } = req.params;
    try {
        const fotosaulas = await FotosAulas.findOne({
            where: { aula_id, foto_id },
            include: [{ model: Aulas }, { model: Fotos }]
        });

        if (!fotosaulas) {
            return res.status(404).json({ message: "No se encontró la relación aula-fotos" });
        }

        res.json({ data: fotosaulas });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getFotosByAulaId = async (req, res) => {
    const { aula_id } = req.params;
    try {
        const cachedFotosAula = await redisClient.get(`aula_fotos_${aula_id}`);
        if (cachedFotosAula) {
            return res.json({ data: JSON.parse(cachedFotosAula) });
        }
        
        const fotosaulas = await FotosAulas.findAll({
            where: { aula_id },
            include: [{ model: Fotos }]
        });

        if (fotosaulas.length === 0) {
            return res.status(404).json({ message: "No se encontraron fotos para el aula" });
        }

        await redisClient.setEx(`aula_fotos_${aula_id}`, 1800, JSON.stringify(fotosaulas));
        res.json({ data: fotosaulas });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};