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
    fotos:{
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'aulas'
});
