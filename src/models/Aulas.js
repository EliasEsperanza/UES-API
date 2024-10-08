import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

export const Aulas = sequelize.define('aulas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    zona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'zonas',
            key: 'id'
        }
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    indicaciones:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    video_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'videos',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'aulas'
});
