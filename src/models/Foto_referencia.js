import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Fotos } from './Fotos.js';
import { Referencias } from './Referencias.js';

export const FotoReferencia = sequelize.define('foto_referencia', {
    foto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Fotos, 
            key: 'id'
        }
    },
    referencia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Referencias, 
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'foto_referencia' 
});

