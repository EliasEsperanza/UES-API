import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';

export const FotoReferencia = sequelize.define('foto_referencia', {
    foto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'fotos', 
            key: 'id'
        }
    },
    referencia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'referencias', 
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'foto_referencia' 
});

