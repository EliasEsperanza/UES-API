import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Zonas } from "./Zonas.js";

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
            model: Zonas,
            key: 'id'
        }
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'aulas'
});

Aulas.belongsTo(Zonas, { foreignKey: 'zona', as: 'zonaRelacionada' });
