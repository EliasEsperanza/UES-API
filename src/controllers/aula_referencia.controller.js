import { AulaReferencia } from "../models/Aula_Referencia";

export const getAulasReferencias= async(req,res)=>{
    try {
        const aulasReferencia = await AulaReferencia.findAll();
        res.json({
            data: aulasReferencia
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const getAulasReferenciasById= async(req,res)=>{
    const { id } = req.params;
    try {
        const aulaReferencia = await AulaReferencia.findOne({
            where: {
                id
            }
        });
        res.json({
            data: aulaReferencia
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const createAulasReferencias= async(req,res)=>{
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



export const updateAulaseferenciasById= async(req,res)=>{
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



export const deleteAulasReferenciasById= async(req,res)=>{
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
