import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

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
            model: 'zonas',
            key: 'id'
        }
    },
    coordenadas: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    video_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'videos',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'referencias'
});
