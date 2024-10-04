import redisClient from "../database/redis.js";
import { FotosAulas } from "../models/Aula_Fotos.js";

const cacheData = async (key, data, expiration = 1800) => {
    await redisClient.setEx(key, expiration, JSON.stringify(data));
};

const getCachedData = async (key) => {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
};

// Obtener todas las relaciones aula-fotos
export const getFotosAulas = async (req, res) => {
    try {
        const fotosaulas = await FotosAulas.findAll({
            include: [{ model: Aulas }, { model: Fotos }]
        });

        if (!fotosaulas) return res.status(404).json({ message: "No se encontraron registros de aula-fotos" });

        res.json({ data: fotosaulas });
    } catch (error) {
        // Log del error en la consola del servidor para diagnóstico
        console.error("Error al obtener relaciones aula-fotos: ", error);

        // Devolver un mensaje más detallado con el stack del error
        res.status(500).json({ message: "Error interno del servidor", error: error.message || "Detalles no disponibles" });
    }
};
// Obtener una relación específica entre aula y foto por sus IDs
export const getFotosAulasById = async (req, res) => {
    const { aula_id, foto_id } = req.params;
    try {
        const fotosaulas = await FotosAulas.findOne({
            where: { aula_id, foto_id },
            include: [{ model: Aulas }, { model: Fotos }]
        });

        if (!fotosaulas) return res.status(404).json({ message: "No se encontró la relación aula-fotos" });

        res.json({ data: fotosaulas });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

// Obtener todas las fotos de un aula específica
export const getFotosByAulaId = async (req, res) => {
    const { aula_id } = req.params;
    try {
        const cachedFotosAula = await getCachedData(`aula_fotos_${aula_id}`);
        if (cachedFotosAula) return res.json({ data: cachedFotosAula });

        const fotosaulas = await FotosAulas.findAll({
            where: { aula_id },
            include: [{ model: Fotos }]
        });

        if (fotosaulas.length === 0) return res.status(404).json({ message: "No se encontraron fotos para el aula" });

        await cacheData(`aula_fotos_${aula_id}`, fotosaulas);
        res.json({ data: fotosaulas });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

// Crear una nueva relación aula-foto
export const createFotoAulaRelation = async (req, res) => {
    const { aula_id, foto_id } = req.body;
    try {
        const fotosaulas = await FotosAulas.create({ aula_id, foto_id });
        res.json({ data: fotosaulas });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};

// Actualizar una relación aula-foto por sus IDs
export const updateFotoAulaRelation = async (req, res) => {
    const { aula_id, foto_id } = req.params;
    const { new_aula_id, new_foto_id } = req.body;
    try {
        const fotosaulas = await FotosAulas.findOne({ where: { aula_id, foto_id } });

        if (!fotosaulas) return res.status(404).json({ message: "No se encontró la relación aula-fotos" });

        fotosaulas.aula_id = new_aula_id || fotosaulas.aula_id;
        fotosaulas.foto_id = new_foto_id || fotosaulas.foto_id;

        await fotosaulas.save();
        res.json({ data: fotosaulas });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};
