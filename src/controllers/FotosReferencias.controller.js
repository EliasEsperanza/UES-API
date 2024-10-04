import redisClient from "../database/redis.js";
import { FotoReferencia } from "../models/Foto_referencia.js";

export const getFotoReferencias = async (req, res) => {
    try {
        const cachedFotoReferencias = await redisClient.get('foto_referencias');

        if (cachedFotoReferencias) {
            return res.json({
                data: JSON.parse(cachedFotoReferencias)
            });
        }

        const fotoReferencias = await FotoReferencia.findAll({
            attributes: ['foto_id', 'referencia_id']
        });

        await redisClient.setEx('foto_referencias', 1800, JSON.stringify(fotoReferencias));

        res.json({
            data: fotoReferencias
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getFotoReferenciaById = async (req, res) => {
    const { id } = req.params;

    try {
        const cachedFotoReferencia = await redisClient.get(`foto_referencia:${id}`);
        
        if (cachedFotoReferencia) {
            return res.json({
                data: JSON.parse(cachedFotoReferencia)
            });
        }

        const fotoReferencia = await FotoReferencia.findOne({
            where: { foto_id: id },  
            attributes: ['foto_id', 'referencia_id']
        });

        if (fotoReferencia) {
            await redisClient.setEx(`foto_referencia:${id}`, 1800, JSON.stringify(fotoReferencia));
            
            return res.json({
                data: fotoReferencia
            });
        } else {
            return res.status(404).json({
                message: "Relación foto_referencia no encontrada"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getFotoReferenciaByReferenciaId = async (req, res) => {
    const { referencia_id } = req.params;

    try {
        const cachedFotoReferencia = await redisClient.get(`foto_referencia:referencia:${referencia_id}`);
        
        if (cachedFotoReferencia) {
            return res.json({
                data: JSON.parse(cachedFotoReferencia)
            });
        }

        const fotoReferencia = await FotoReferencia.findAll({
            where: { referencia_id },  
            attributes: ['foto_id', 'referencia_id']
        });

        if (fotoReferencia.length > 0) {
            await redisClient.setEx(`foto_referencia:referencia:${referencia_id}`, 1800, JSON.stringify(fotoReferencia));
            
            return res.json({
                data: fotoReferencia
            });
        } else {
            return res.status(404).json({
                message: "No se encontraron relaciones con la referencia indicada"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


