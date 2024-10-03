import redisClient from "../database/redis.js";
import { VideoReferencia } from "../models/Video_Referencia.js"; 

export const getVideosReferencia = async (req, res) => {
    try {
        const cachedReferencias = await redisClient.get('video_referencia');
        if (cachedReferencias) {
            return res.json({
                data: JSON.parse(cachedReferencias)
            });
        }

        const videoReferencia = await VideoReferencia.findAll();

        await redisClient.setEx('video_referencia', 1800, JSON.stringify(videoReferencia));

        res.json({
            data: videoReferencia
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


export const getVideoReferenciaById = async (req, res) => {
    const { referencia_id, video_id } = req.params;
    try {
        const cachedReferencia = await redisClient.get(`video_referencia:${referencia_id}:${video_id}`);

        if (cachedReferencia) {
            return res.json({
                data: JSON.parse(cachedReferencia)
            });
        }

        const videoReferencia = await VideoReferencia.findOne({
            where: {
                referencia_id,
                video_id
            }
        });

        if (videoReferencia) {
            await redisClient.setEx(`video_referencia:${referencia_id}:${video_id}`, 1800, JSON.stringify(videoReferencia));
            return res.json({
                data: videoReferencia
            });
        } else {
            return res.status(404).json({
                message: "Referencia de video no encontrada"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getVideoReferenciaByReferenciaId = async (req, res) => {
    const { referencia_id } = req.params;
    
    try {
        const cachedReferencias = await redisClient.get(`video_referencia:${referencia_id}`);
        
        if (cachedReferencias) {
            return res.json({
                data: JSON.parse(cachedReferencias)
            });
        }

        const videoReferencia = await VideoReferencia.findAll({
            where: {
                referencia_id
            }
        });

        if (videoReferencia.length > 0) {
            await redisClient.setEx(`video_referencia:${referencia_id}`, 1800, JSON.stringify(videoReferencia));
            return res.json({
                data: videoReferencia
            });
        } else {
            return res.status(404).json({
                message: "No se encontraron videos para esta referencia"
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};