import { FotoReferencia } from "../models/Foto_referencia.js";
import { Fotos } from "../models/Fotos.js";
import { Referencias } from "../models/Referencias.js";

// Obtener todas las relaciones de fotos y referencias
export const getFotosReferencias = async (req, res) => {
    try {
        console.log("Solicitando todas las relaciones de foto-referencia...");
        const fotosreferencias = await FotoReferencia.findAll({
            include: [{ model: Fotos }, { model: Referencias }]
        });

        if (!fotosreferencias || fotosreferencias.length === 0) {
            console.log("No se encontraron relaciones foto-referencia.");
            return res.status(404).json({ message: "No se encontraron relaciones foto-referencia" });
        }

        console.log("Relaciones foto-referencia encontradas:", fotosreferencias);
        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error("Error al obtener todas las relaciones de foto-referencia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener una relación de foto y referencia por ID
export const getFotoReferenciaById = async (req, res) => {
    const { foto_id, referencia_id } = req.params;
    try {
        console.log(`Buscando relación foto-referencia con foto_id: ${foto_id} y referencia_id: ${referencia_id}`);
        const fotosreferencias = await FotoReferencia.findOne({
            where: { foto_id, referencia_id },
            include: [{ model: Fotos }, { model: Referencias }]
        });

        if (!fotosreferencias) {
            console.log(`No se encontró la relación para foto_id: ${foto_id} y referencia_id: ${referencia_id}`);
            return res.status(404).json({ message: "No se encontró la relación foto-referencias" });
        }

        console.log("Relación foto-referencia encontrada:", fotosreferencias);
        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error(`Error al obtener la relación con foto_id: ${foto_id} y referencia_id: ${referencia_id}:`, error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las referencias asociadas a una foto por foto_id
export const getReferenciasByFotoId = async (req, res) => {
    const { foto_id } = req.params;
    try {
        console.log(`Buscando referencias para foto_id: ${foto_id}`);
        const fotosreferencias = await FotoReferencia.findAll({
            where: { foto_id },
            include: [{ model: Referencias }]
        });

        if (fotosreferencias.length === 0) {
            console.log(`No se encontraron referencias para la foto con id: ${foto_id}`);
            return res.status(404).json({ message: "No se encontraron referencias para la foto" });
        }

        console.log(`Referencias encontradas para foto_id: ${foto_id}`, fotosreferencias);
        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error(`Error al obtener referencias para foto_id: ${foto_id}:`, error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las fotos asociadas a una referencia por referencia_id
export const getFotosByReferenciaId = async (req, res) => {
    const { referencia_id } = req.params;
    try {
        console.log(`Buscando fotos para referencia_id: ${referencia_id}`);
        const fotosreferencias = await FotoReferencia.findAll({
            where: { referencia_id },
            include: [{ model: Fotos }]
        });

        if (fotosreferencias.length === 0) {
            console.log(`No se encontraron fotos para la referencia con id: ${referencia_id}`);
            return res.status(404).json({ message: "No se encontraron fotos para la referencia" });
        }

        console.log(`Fotos encontradas para referencia_id: ${referencia_id}`, fotosreferencias);
        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error(`Error al obtener fotos para referencia_id: ${referencia_id}:`, error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getFotosReferenciasOrdenByReferencias = async (req,res) =>{
    try {
        
        const fotosreferencias = await FotoReferencia.findAll({
            include: [{ model: Fotos }, { model: Referencias }],
            order: [['referencia_id', 'ASC']]
        });

        if (!fotosreferencias || fotosreferencias.length === 0) {
            console.log("No se encontraron relaciones foto-referencia.");
            return res.status(404).json({ message: "No se encontraron relaciones foto-referencia" });
        }

        console.log("Relaciones foto-referencia encontradas:", fotosreferencias);
        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error("Error al obtener todas las relaciones de foto-referencia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
