import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

export const Fotos = sequelize.define('fotos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    url_foto: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'fotos'
});
