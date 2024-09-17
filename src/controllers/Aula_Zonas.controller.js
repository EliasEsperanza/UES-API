import redisClient from "../database/redis.js";
import { AulaZona } from "../models/Aula_Zona.js";
import {Aulas} from "../models/Aulas.js";
import {Zonas} from "../models/Zonas.js";

export const get_Aulas_Zonas= async(req,res)=>{
    try {
        const cachedReferencias = await redisClient.get('aula_zona');
        if (cachedReferencias) {
           return res.json({
                data: JSON.parse(cachedReferencias)
            });
            
        }
        const aulas_zonas_Referencia = await AulaZona.findAll();

        await redisClient.setEx('aula_zona', 1800, JSON.stringify(aulas_zonas_Referencia));

        res.json({
            data: aulas_zonas_Referencia
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


export const get_Aula_Zonas_ById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscammos en la caché
        const cachedReferencia = await redisClient.get(`aula_zona:${id}`);
        
        if (cachedReferencia) {
            return res.json({
                data: JSON.parse(cachedReferencia)
            });
        }

        // Buscammos  en la base de datos
        const aulaZona = await AulaZona.findOne({
            where: {
                id 
            }
        });

        if (aulaZona) {
            await redisClient.setEx(`aula_zona:${id}`, 1800, JSON.stringify(aulaZona));
            
            return res.json({
                data: aulaZona
            });
        } else {
            return res.status(404).json({
                message: "Relación entre aula y zona no encontrada"
            });
        }
        
    } catch (error) {
        console.error('Error interno del servidor:', error); 
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
};



export const create_Aula_Zonas = async (req, res) => {
    const { aulaId, zonaId } = req.body; //nos obtiene como lo valores que hay en la peticion

    try {
        //Verificamos si los id ya existen  en las tbl
        const aula = await Aulas.findByPk(aulaId);
        const zona = await Zonas.findByPk(zonaId);

        if (!aula || !zona) {
            return res.status(404).json({
                message: "Aula o Zona no encontrada"
            });
        }

        const newAulaZona = await AulaZona.create({
            aula_id: aulaId,
            zona_id: zonaId
        } ,{
            fields: ['aula_id', 'zona_id']
        });

        res.json({
            message: "Asociación de Aula y Zona creada exitosamente",
            data: newAulaZona
        });

    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}; 

//esto no es necesario xD
export const update_Aula_Zona_ById = async (req, res) => {
    const { aula_id, zona_id } = req.params;
    try {
        // Buscamos la relación aula-zona por sus ID
        const aulaZona = await AulaZona.findAll({
            attributes: ['aula_id', 'zona_id'],
            where: {
                aula_id,
                zona_id
            }
        });

        if (aulaZona.length > 0) {
            for (const valor of aulaZona) {
                await valor.update({
                    aula_id,
                    zona_id
                });
            }
            
            res.json({
                message: "AULA-ZONA ACTUALIZADO CORRECTAMENTE",
                data: aulaZona
            });
        } else {
            res.status(404).json({
                message: "No se encontraron las aulas ni la zona"
            });
        }
    } catch (error) {
        console.error("Error interno del servidor:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};


export const delete_Aula_Zona_ById = async (req, res) => {
    const { aula_id, zona_id } = req.params; //obtenemos los parametros de la url
    try {
        const deletedRows = await AulaZona.destroy({
            where: {
                aula_id,
                zona_id
            }
        });

        res.json({
            message: deletedRows === 1 ? "Relación Aula-Zona eliminada exitosamente" : "Relación Aula-Zona no encontrada"
        });
    } catch (error) {
        console.error("Error interno del servidor:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};