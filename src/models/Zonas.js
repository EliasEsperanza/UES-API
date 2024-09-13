import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

export const Zonas = sequelize.define('zonas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    coordenadas: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'zonas'
});
