import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Zonas } from "./Zonas.js";

export const Referencias = sequelize.define('referencias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    foto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    zona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Zonas,
            key: 'id'
        }
    },
    coordenadas: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'referencias'
});

Referencias.belongsTo(Zonas, { foreignKey: 'zona', as: 'zonaReferencia' });
