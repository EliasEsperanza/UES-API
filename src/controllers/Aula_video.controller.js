import redisClient from "../database/redis.js";
import { AulaVideos } from "../models/Aula_video.js";

export const getAulasVideos = async (req, res) =>{
    try {
        const cachedAulasVideos = await redisClient.get('aula_video');
        if (cachedAulasVideos) {
            return res.json({
                data: JSON.parse(cachedAulasVideos)
            });
        }
        const aulasvideos = await AulaVideos.findAll();
        await redisClient.setEx('aula_video', 1800, JSON.stringify(aulasvideos));
        res.json({
            data: aulasvideos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getAulaVideoById = async (req, res) =>{
    const { aula_id, video_id } = req.params;
    try {
        const aulaVideo = await AulaVideos.findOne({
            where: {
                aula_id,
                video_id
            }
        });
        if (!aulaVideo) {
            return res.status(404).json({
                message: "No se encontró la relación aula-video"
            });
        }
        res.json({
            data: aulaVideo
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getVideoByAulaId = async (req, res) => {
    const { aula_id } = req.params;
    try {
        const cachedAulaVideos = await redisClient.get(`aula_video_${aula_id}`);
        if (cachedAulaVideos) {
            return res.json({
                data: JSON.parse(cachedAulaVideos)
            });
        }

        const aulaVideos = await AulaVideos.findAll({
            where: { aula_id }
        });

        if (aulaVideos.length === 0) {
            return res.status(404).json({
                message: "No se encontraron videos para el aula"
            });
        }

        await redisClient.setEx(`aula_video_${aula_id}`, 1800, JSON.stringify(aulaVideos));

        res.json({
            data: aulaVideos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};