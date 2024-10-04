import redisClient from "../database/redis.js";
import { VideoReferencia } from "../models/Video_Referencia.js"; 

export const getVideosReferencia = async (req, res) =>{
    try {
        const cachedVideosReferencia = await redisClient.get('video_referencia');
        if (cachedVideosReferencia) {
            return res.json({
                data: JSON.parse(cachedVideosReferencia)
            });
        }
        const videosReferencia = await VideoReferencia.findAll();
        await redisClient.setEx('video_referencia', 1800, JSON.stringify(videosReferencia));
        res.json({
            data: videosReferencia
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getVideoReferenciaById = async (req, res) =>{
    const { video_id, referencia_id } = req.params;
    try {
        const videoReferencia = await VideoReferencia.findOne({
            where: {
                video_id,
                referencia_id
            }
        });
        if (!videoReferencia) {
            return res.status(404).json({
                message: "No se encontró la relación video-referencia"
            });
        }
        res.json({
            data: videoReferencia
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getReferenciaByVideoId = async (req, res) =>{
    const { video_id } = req.params;
    try {
        const videoReferencias = await VideoReferencia.findAll({
            where: {
                video_id
            }
        });
        if (!videoReferencias) {
            return res.status(404).json({
                message: "No se encontraron referencias para el video"
            });
        }
        res.json({
            data: videoReferencias
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getVideoByReferenciaId = async (req, res) =>{
    const { referencia_id } = req.params;
    try {
        const videoReferencias = await VideoReferencia.findAll({
            where: {
                referencia_id
            }
        });
        if (!videoReferencias) {
            return res.status(404).json({
                message: "No se encontraron videos para la referencia"
            });
        }
        res.json({
            data: videoReferencias
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}; 
