import redisClient from "../database/redis.js";
import { Videos } from "../models/Videos.js";

export const getVideos = async (req, res) => {
    try {
        const cachedVideos = await redisClient.get('videos');

        if (cachedVideos) {
            return res.json({
                data: JSON.parse(cachedVideos)
            });
        }

        const videos = await Videos.findAll({
            attributes: ['id', 'url', 'nombre']
        });
        
        await redisClient.setEx('videos', 1800, JSON.stringify(videos));

        res.json({
            data: videos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getVideoById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const cachedVideo = await redisClient.get(`video:${id}`);
        
        if (cachedVideo) {
            return res.json({
                data: JSON.parse(cachedVideo)
            });
        }

        const video = await Videos.findOne({
            where: { id },
            attributes: ['id', 'url', 'nombre']
        });

        if (video) {
            await redisClient.setEx(`video:${id}`, 1800, JSON.stringify(video));
            
            return res.json({
                data: video
            });
        } else {
            return res.status(404).json({
                message: "Video no encontrado"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};