import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

export const Videos = Sequelize.define('videos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING(255),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'videos'
});
