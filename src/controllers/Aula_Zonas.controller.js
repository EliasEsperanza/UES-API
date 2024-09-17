import redisClient from "../database/redis.js";
import { AulaZona } from "../models/Aula_Zona.js";
import {Aulas} from "../models/Aulas.js";
import {Zonas} from "../models/Zonas.js";

export const get_Aulas_Zonas_Referencias= async(req,res)=>{
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
        console.error('Error interno del servidor:', error); // Registro de errores
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
            aula_id,
            zona_id
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