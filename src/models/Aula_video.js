import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { Aulas } from "./Aulas.js";
import { Videos } from "./Videos.js";

export const AulaVideos = sequelize.define('aula_video', {
    aula_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Aulas,
            key: 'id'
        }
    },
    video_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: Videos,
            key: 'id'
        }
    }
},{
    timestamps: false,
    tableName: 'aula_video'
}
);
