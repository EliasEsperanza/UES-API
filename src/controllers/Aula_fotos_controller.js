import redisClient from "../database/redis.js";
import { FotosAulas } from "../models/Aula_Fotos.js";

// Obtener todas las relaciones foto-aula
export const getFotosAulas = async (req, res) => {
    try {
        const cachedFotosAulas = await redisClient.get('fotos_aulas');
        if (cachedFotosAulas) {
            return res.json({
                data: JSON.parse(cachedFotosAulas)
            });
        }

        const fotosAulas = await FotosAulas.findAll();

        await redisClient.setEx('fotos_aulas', 1800, JSON.stringify(fotosAulas));

        res.json({
            data: fotosAulas
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// Obtener una relación específica por fotos_id y aula_id
export const getFotosAulasById = async (req, res) => {
    const { fotos_id, aula_id } = req.params;
    try {
        const cachedFotosAulas = await redisClient.get(`fotos_aulas:${fotos_id}:${aula_id}`);

        if (cachedFotosAulas) {
            return res.json({
                data: JSON.parse(cachedFotosAulas)
            });
        }

        const fotosAulas = await FotosAulas.findOne({
            where: {
                fotos_id,
                aula_id
            }
        });

        if (fotosAulas) {
            await redisClient.setEx(`fotos_aulas:${fotos_id}:${aula_id}`, 1800, JSON.stringify(fotosAulas));
            return res.json({
                data: fotosAulas
            });
        } else {
            return res.status(404).json({
                message: "Relación foto-aula no encontrada"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// Obtener todas las fotos de un aula específica
export const getFotosByAulaId = async (req, res) => {
    const { aula_id } = req.params;
    
    try {
        const cachedFotos = await redisClient.get(`fotos_aulas:${aula_id}`);
        
        if (cachedFotos) {
            return res.json({
                data: JSON.parse(cachedFotos)
            });
        }

        const fotos = await FotosAulas.findAll({
            where: {
                aula_id
            }
        });

        if (fotos.length > 0) {
            await redisClient.setEx(`fotos_aulas:${aula_id}`, 1800, JSON.stringify(fotos));
            return res.json({
                data: fotos
            });
        } else {
            return res.status(404).json({
                message: "No se encontraron fotos para este aula"
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const createFotosAulas = async (req, res) => {
    const { fotos_id, aula_id } = req.body;
    try {
        const newFotosAulas = await FotosAulas.create({
            fotos_id,
            aula_id
        }, {
            fields: ['fotos_id', 'aula_id']
        });

        if (newFotosAulas) {
            res.json({
                message: "Relación foto-aula creada exitosamente",
                data: newFotosAulas
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const updateFotosAulasById = async (req, res) => {
    const { fotos_id, aula_id } = req.params;
    const { new_fotos_id, new_aula_id } = req.body;
    try {
        const fotosAulas = await FotosAulas.findOne({
            where: {
                fotos_id,
                aula_id
            }
        });

        if (fotosAulas) {
            await fotosAulas.update({
                fotos_id: new_fotos_id,
                aula_id: new_aula_id
            });
            res.json({
                message: "Relación foto-aula actualizada exitosamente",
                data: fotosAulas
            });
        } else {
            res.status(404).json({
                message: "Relación foto-aula no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const deleteFotosAulasById = async (req, res) => {
    const { fotos_id, aula_id } = req.params;
    try {
        const deletedRows = await FotosAulas.destroy({
            where: {
                fotos_id,
                aula_id
            }
        });

        res.json({
            message: deletedRows === 1 ? "Relación foto-aula eliminada exitosamente" : "Relación foto-aula no encontrada"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
