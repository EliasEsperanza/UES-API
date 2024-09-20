import redisClient from "../database/redis.js";
import { AulaReferencia } from "../models/Aula_Referencia.js";

export const getAulasReferencias = async (req, res) => {
    try {
        const cachedReferencias = await redisClient.get('aula_referencia');
        if (cachedReferencias) {
            return res.json({
                data: JSON.parse(cachedReferencias)
            });
        }

        const aulasReferencia = await AulaReferencia.findAll();

        await redisClient.setEx('aula_referencia', 1800, JSON.stringify(aulasReferencia));

        res.json({
            data: aulasReferencia
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


export const getAulaReferenciaById = async (req, res) => {
    const { aula_id, referencia_id } = req.params;
    try {
        const cachedReferencia = await redisClient.get(`aula_referencia:${aula_id}:${referencia_id}`);

        if (cachedReferencia) {
            return res.json({
                data: JSON.parse(cachedReferencia)
            });
        }

        const aulaReferencia = await AulaReferencia.findOne({
            where: {
                aula_id,
                referencia_id
            }
        });

        if (aulaReferencia) {
            await redisClient.setEx(`aula_referencia:${aula_id}:${referencia_id}`, 1800, JSON.stringify(aulaReferencia));
            return res.json({
                data: aulaReferencia
            });
        } else {
            return res.status(404).json({
                message: "Referencia de aula no encontrada"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const createAulaReferencia = async (req, res) => {
    const { referencia_id } = req.body;
    try {
        const newAulaReferencia = await AulaReferencia.create({
            referencia_id
        }, {
            fields: ['referencia_id']
        });

        if (newAulaReferencia) {
            res.json({
                message: "Referencia de aula creada exitosamente",
                data: newAulaReferencia
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const updateAulaReferenciaById = async (req, res) => {
    const { id } = req.params;
    const { referencia_id } = req.body;
    try {
        const aulaReferencia = await AulaReferencia.findAll({
            attributes: ['aula_id', 'referencia_id'],
            where: {
                id
            }
        });

        if (aulaReferencia.length > 0) {
            aulaReferencia.forEach(async aula_referencia => {
                await aula_referencia.update({
                    referencia_id
                });
            });
            res.json({
                message: "Referencia de aula actualizada exitosamente",
                data: aulaReferencia
            });
        } else {
            res.status(404).json({
                message: "Referencia de aula no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const deleteAulaReferenciaById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await AulaReferencia.destroy({
            where: {
                id
            }
        });

        res.json({
            message: deletedRows === 1 ? "Referencia de aula eliminada exitosamente" : "Referencia de aula no encontrada"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
