import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Videos } from "./Videos.js";
import { Referencias } from "./Referencias.js";


export const VideoReferencia = sequelize.define('referencia_video',{
    referencia_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        references: {
            model:Referencias,
            key: 'id'
        }
    },
    video_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        references: {
            model:Videos,
            key: 'id'
        }
    }

},{
    timestamps:false,
    tableName:'referencia_video'
})