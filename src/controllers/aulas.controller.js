import { Aulas } from '../models/Aulas.js';
import { Zonas } from '../models/Zonas.js';
import { Sequelize } from 'sequelize';

// get aulas with their associated area
export const getAulas = async (req, res) => {
    try {
        const aulas = await Aulas.findAll({
            include: {
                model: Zonas,
                attributes: ['nombre']
            }
        });

        if (aulas.length > 0) {
            res.status(200).json({
                message: "Aulas obtenidas con éxito",
                data: aulas
            });
        } else {
            res.status(404).json({
                message: "No se encontraron aulas"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// create a new aula
export const createAula = async (req, res) => {
    const { nombre, capacidad, zonaId } = req.body;
    try {
        const newAula = await Aulas.create({
            nombre,
            capacidad,
            zonaId
        }, {
            fields: ['nombre', 'capacidad', 'zonaId']
        });

        if (newAula) {
            res.status(201).json({
                message: "Aula creada exitosamente",
                data: newAula
            });
        } else {
            res.status(400).json({
                message: "No se pudo crear el aula"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

//get aula by id
export const getAulaById = async (req, res) => {
    const { id } = req.params;
    try {
        const aula = await Aulas.findOne({
            where: { id },
            include: {
                model: Zonas,
                attributes: ['nombre']
            }
        });

        if (aula) {
            res.status(200).json({
                message: "Aula obtenida con éxito",
                data: aula
            });
        } else {
            res.status(404).json({
                message: "Aula no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// update aula by Id
export const updateAulaById = async (req, res) => {
    const { id } = req.params;
    const { nombre, capacidad, zonaId } = req.body;
    try {D
        const aula = await Aulas.findOne({
            where: { id }
        });

        if (aula) {
            await aula.update({
                nombre,
                capacidad,
                zonaId
            });

            res.status(200).json({
                message: "Aula actualizada exitosamente",
                data: aula
            });
        } else {
            res.status(404).json({
                message: "Aula no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// delete aula by id
export const deleteAulaById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Aulas.destroy({
            where: { id }
        });

        if (deletedRows === 1) {
            res.status(200).json({
                message: "Aula eliminada exitosamente"
            });
        } else {
            res.status(404).json({
                message: "Aula no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};
