import redisClient from '../database/redis.js';
import { Aulas } from '../models/Aulas.js';
import { Zonas } from '../models/Zonas.js';
import { Videos } from '../models/Videos.js';

export const getAulas = async (req, res) => {
    try {
        const cachedAulas = await redisClient.get('aulas');

        if (cachedAulas) {
            return res.json({
                data: JSON.parse(cachedAulas)
            });
        }

        const aulas = await Aulas.findAll({
            attributes: ['id', 'numero', 'zona', 'capacidad', 'indicaciones', 'video_id'],
            include: [
                {
                    model: Zonas,
                    as: 'zonaRelacionada',
                    attributes: ['nombre']
                },
                {
                    model: Videos,
                    as: 'videoAula',
                    attributes: ['url', 'nombre']
                }
            ]
        });

        await redisClient.setEx('aulas', 1800, JSON.stringify(aulas));

        res.json({
            data: aulas
        });
    } catch (error) {
        console.error("Error con Redis o la consulta:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};



export const createAula = async (req, res) => {
    const { numero, zona, capacidad, indicaciones, video_id } = req.body;
    try {
        const newAula = await Aulas.create({
            numero,
            zona,
            capacidad,
            indicaciones,
            video_id
        }, {
            fields: ['numero', 'zona', 'capacidad','indicaciones', 'video_id']
        });

        if (newAula) {
            res.json({
                message: "Aula creada exitosamente",
                data: newAula
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getAulaById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const cachedAula = await redisClient.get(`aula:${id}`);
        
        if (cachedAula) {
            return res.json({
                data: JSON.parse(cachedAula)
            });
        }

        const aula = await Aulas.findOne({
            where: { id },
            include: [
                {
                    model: Zonas,
                    as: 'zonaRelacionada',
                    attributes: ['nombre']
                },
                {
                    model: Videos,
                    as: 'videoAula',
                    attributes: ['url', 'nombre']
                }
            ]
        });

        if (aula) {
            await redisClient.setEx(`aula:${id}`, 1800, JSON.stringify(aula));
            
            return res.json({
                data: aula
            });
        } else {
            return res.status(404).json({
                message: "Aula no encontrada"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const updateAulaById = async (req, res) => {
    const { id } = req.params;
    const { numero, zona, capacidad, video_id} = req.body;
    try {
        const aulas = await Aulas.findAll({
            attributes: ['id', 'numero', 'zona', 'capacidad', 'indicaciones', 'video_id'],
            where: { id }
        });

        if (aulas.length > 0) {
            aulas.forEach(async aula => {
                await aula.update({
                    numero,
                    zona,
                    capacidad,
                    indicaciones,
                    video_id
                });
            });
            res.json({
                message: "Aula actualizada exitosamente",
                data: aulas
            });
        } else {
            res.status(404).json({
                message: "Aula no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const deleteAulaById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Aulas.destroy({
            where: { id }
        });
        res.json({
            message: deletedRows === 1 ? "Aula eliminada exitosamente" : "Aula no encontrada"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};