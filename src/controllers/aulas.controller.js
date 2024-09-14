import { Aulas } from '../models/Aulas.js';
import { Zonas } from '../models/Zonas.js';


export const getAulas = async (req, res) => {
    try {
        
        const aulas = await Aulas.findAll({
            include: {
                model: Zonas, 
                attributes: ['nombre'] //atributos que deseas de elegir de las zonas
            }
        });
        
        //si se encuentran las aulas
        res.status(200).json({
            message: "Aulas obtenidas con éxito",
            data: aulas
        });
    } catch (error) {
        // por si alguito sale maluco
        res.status(500).json({
            message: "Error al obtener las aulas",
            error: error.message
        });
    }
};
