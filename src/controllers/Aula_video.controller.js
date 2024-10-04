//import { json } from "express";
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

export const getAulaVideoById = async (req,res) =>{
    const {aula_id, video_id} = req.params;
    try {
        const cachedAulasVideos = await redisClient.get(`aula_video:${aula_id}:${video_id}`);
        if (cachedAulasVideos) {
            return res.json({
                data:JSON.parse(cachedAulasVideos)
            });
        }
        const aulavideo = await AulaVideos.findOne({
            where:{
                aula_id,
                referencia_id
            }
        });
        if(aulavideo){
            await redisclient.setEx(`aula_video:${aula_id}:${video_id}`, 1800, JSON.stringify(aulavideo));
            return res.json({
                data: aulavideo
            });
        }
        else{
            return res.status(404).json({
                message: "Video de aula no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getVideoByAulaId = async(req,res) =>{
    const {aula_id} = req.params;
    try {
        const cachedAulasVideos = await redisClient.get(`aula_video:${aula_id}`);

        if (cachedAulasVideos) {
            return res.json({
                data: json.parse(cachedAulasVideos)
            })
        }
        const videos = await AulaVideos.findAll({
            where:{
                aula_id
            }
        });

        if (videos.lenght > 0) {
            await redisClient.setEx(`aula_video:${aula_id}`, 1800, JSON.stringify(videos));
            return res.json({
                data:videos
            });
        } else {
            return res.status(404).json({
                message:"No se encontraron los videos para este aula"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}