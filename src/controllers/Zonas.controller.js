import redisClient from "../database/redis";
import { Zonas } from "../models/Zonas.js";

export const getZonas = async (req, res)=>{
    try {
        const cachedZonas = await redisClient.get('zonas');
        if(cachedZonas){
            return res.json({
                data:JSON.parse(cachedZonas)
            });
        }
        const zonas = await Zonas.findAll();
        
        await redisClient.setEx('zonas', 1800, JSON.stringify(zonas));

        res.json({
            data:zonas
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "ERROR INTERNO DEL SERVIDOR"
        });
    }
}
export const createZona = async (req, res)=>{
    const {nombre, coordenadas} = req.body;
    try {
        const newZona = await Zonas.create({
            nombre,
            coordenadas
        },
        {fields:['nombre', 'coordenadas']});
        if(newZona){
            res.json({
                message: "Zona creada fantabulosamente",
                data: newZona
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "ERROR INTERNO DEL SERVIDOR"
        });
    }
}
export const getZonaById = async (req,res) =>{
    const id = req.params;
    try {
        const cachedZonas = await redisClient.get(`zonas:${id}`);
        if(cachedZonas)
        {
            return res.json({
                data:JSON.parse(cachedZonas)
            });
        }
        const zona = await Zonas.findOne({
            where:{
                id
            }
        });
        if(zona){
            await redisClient.setEx(`zonas:${id}`,1800, JSON.stringify(zona));
            return res.json({
                data:zona
            });
        }
        else
        {
            return res.status(404).json({
                message:"Zona no encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "ERROR INTERNO DEL SERVIDOR"
        });
    }
}
export const updateZonaById = async(req, res)=>{
    const {id} = req.params;
    const{nombre, coordenadas} = req.body;

    try{
        const zonas = await Zonas.findAll({
            attributes: ['id','nombre','coordenadas'],
            where:{
                id
            }
        });
        if (zonas.length > 0) {
            zonas.forEach(async zona => {
                await zonas.update({
                    nombre,
                    coordenadas
                });    
            });//nota eliminar los mensaje personalizado
            res.json({
                message: "Zona actualizada fantasmabolicamente",
                data: zonas
            });
        } else{
            res.status(400).json({
                message: "Zona no encontrada"
            });
        }
    }
    catch (error){
        res.status(500).json({
            message: "ERROR INTERNO DEL SERVIDOR"
        });
    }
}

export const deleteZonaById = async (req,res) =>{
    const {id} = req.params;
    try {
        const ZonaDelete = await Zonas.destroy({
            where:{
                id
            }
        });
        res.json({
            message: ZonaDelete === 1 ? "Zona Eliminada terrorificamente" : "Zona no encontrada"
        });
    } catch (error) {
        res.status(500).json({
            message: "ERROR INTERNO DEL SERVIDOR"
        });
    }
}