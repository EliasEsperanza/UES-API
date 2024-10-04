import redisClient from "../database/redis.js";
import { Fotos } from "../models/Fotos.js";

export const getFotos = async (req, res) => {
    try {
        const cachedFotos = await redisClient.get('fotos');

        if (cachedFotos) {
            return res.json({
                data: JSON.parse(cachedFotos)
            });
        }

        const fotos = await Fotos.findAll({
            attributes: ['id', 'nombre', 'url_foto']
        });
        
        await redisClient.setEx('fotos', 1800, JSON.stringify(fotos));

        res.json({
            data: fotos
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getFotosById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const cachedFoto = await redisClient.get(`fotos:${id}`);
        
        if (cachedFoto) {
            return res.json({
                data: JSON.parse(cachedFoto)
            });
        }

        const foto = await Fotos.findOne({
            where: { id },
            attributes: ['id', 'nombre', 'url_foto']
        });

        if (foto) {
            await redisClient.setEx(`fotos:${id}`, 1800, JSON.stringify(foto));
            
            return res.json({
                data: foto
            });
        } else {
            return res.status(404).json({
                message: "Foto no encontrada"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
