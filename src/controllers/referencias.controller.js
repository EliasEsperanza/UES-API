import { Referencias } from '../models/Referencias.js';

export const getReferencias = async (req, res) => {
    try {
        const referencias = await Referencias.findAll();
        res.json({
            data: referencias
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const createReferencia = async (req, res) => {
    const { nombre, descripcion, foto, zona, coordenadas } = req.body;
    try {
        const newReferencia = await Referencias.create({
            nombre,
            descripcion,
            foto,
            zona,
            coordenadas
        }, {
            fields: ['nombre', 'descripcion', 'foto', 'zona', 'coordenadas']
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
        const referencia = await Referencias.findOne({
            where: {
                id
            }
        });
        res.json({
            data: referencia
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const updateReferenciaById = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, foto, zona, coordenadas } = req.body;
    try {
        const referencias = await Referencias.findAll({
            attributes: ['id', 'nombre', 'descripcion', 'foto', 'zona', 'coordenadas'],
            where: {
                id
            }
        });
        if (referencias.length > 0) {
            referencias.forEach(async referencia => {
                await referencia.update({
                    nombre,
                    descripcion,
                    foto,
                    zona,
                    coordenadas
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
