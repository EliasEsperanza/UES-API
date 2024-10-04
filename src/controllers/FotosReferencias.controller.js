import { FotoReferencia } from "../models/Foto_referencia.js";
import { Fotos } from "../models/Fotos.js";
import { Referencias } from "../models/Referencias.js";

export const getFotosReferencias = async (req, res) => {
    try {
        const fotosreferencias = await FotoReferencia.findAll({
            include: [{ model: Fotos }, { model: Referencias }]
        });
        
        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getFotoReferenciaById = async (req, res) => {
    const { foto_id, referencia_id } = req.params;
    try {
        const fotosreferencias = await FotoReferencia.findOne({
            where: { foto_id, referencia_id },
            include: [{ model: Fotos }, { model: Referencias }]
        });

        if (!fotosreferencias) {
            return res.status(404).json({ message: "No se encontró la relación foto-referencias" });
        }

        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getReferenciasByFotoId = async (req, res) => {
    const { foto_id } = req.params;
    try {
        const fotosreferencias = await FotoReferencia.findAll({
            where: { foto_id },
            include: [{ model: Referencias }]
        });

        if (fotosreferencias.length === 0) {
            return res.status(404).json({ message: "No se encontraron referencias para la foto" });
        }

        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getFotosByReferenciaId = async (req, res) => {
    const { referencia_id } = req.params;
    try {
        const fotosreferencias = await FotoReferencia.findAll({
            where: { referencia_id },
            include: [{ model: Fotos }]
        });

        if (fotosreferencias.length === 0) {
            return res.status(404).json({ message: "No se encontraron fotos para la referencia" });
        }

        res.json({ data: fotosreferencias });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
