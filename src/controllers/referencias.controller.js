import redisClient from '../database/redis.js';
import { Referencias } from '../models/Referencias.js';

export const getReferencias = async (req, res) => {
    try {
        let cachedReferencias;
        try {
            cachedReferencias = await redisClient.get('referencias');
        } catch (redisError) {
            console.error("Error al obtener datos de Redis", redisError);
        }

        if (cachedReferencias) {
            return res.json({
                data: JSON.parse(cachedReferencias)
            });
        }

        const referencias = await Referencias.findAll();
        
        try {
            await redisClient.setEx('referencias', 1800, JSON.stringify(referencias));
        } catch (redisError) {
            console.error("Error al almacenar datos en Redis", redisError);
        }

        return res.json({
            data: referencias
        });
    } catch (error) {
        console.error("Error en el servidor", error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


export const createReferencia = async (req, res) => {
    const { nombre, descripcion, zona, coordenadas, video_id } = req.body;
    try {
        const newReferencia = await Referencias.create({
            nombre,
            descripcion,
            zona,
            coordenadas,
            video_id
        }, {
            fields: ['nombre', 'descripcion', 'zona', 'coordenadas', 'video_id']
        });
        if (newReferencia) {
            res.json({
                message: "Referencia creada exitosamente",
                data: newReferencia
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const getReferenciaById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const cachedReferencia = await redisClient.get(`referencia:${id}`);
        
        if (cachedReferencia) {
            return res.json({
                data: JSON.parse(cachedReferencia)
            });
        }

        const referencia = await Referencias.findOne({
            where: {
                id
            }
        });

        if (referencia) {
            await redisClient.setEx(`referencia:${id}`, 1800, JSON.stringify(referencia));
            
            return res.json({
                data: referencia
            });
        } else {
            return res.status(404).json({
                message: "Referencia no encontrada"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


export const updateReferenciaById = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, zona, coordenadas, video_id } = req.body;
    try {
        const referencias = await Referencias.findAll({
            attributes: ['id', 'nombre', 'descripcion', 'zona', 'coordenadas', 'video_id'],
            where: {
                id
            }
        });
        if (referencias.length > 0) {
            referencias.forEach(async referencia => {
                await referencia.update({
                    nombre,
                    descripcion,
                    zona,
                    coordenadas,
                    video_id
                });
            });
            res.json({
                message: "Referencia actualizada exitosamente",
                data: referencias
            });
        } else {
            res.status(404).json({
                message: "Referencia no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const deleteReferenciaById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Referencias.destroy({
            where: {
                id
            }
        });
        res.json({
            message: deletedRows === 1 ? "Referencia eliminada exitosamente" : "Referencia no encontrada"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}
