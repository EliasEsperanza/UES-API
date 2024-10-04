import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Fotos } from "./Fotos.js";
import { Referencias } from "./Referencias.js";

export const FotoReferencia = sequelize.define('foto_referencia', {
    foto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Fotos,
            key: 'id'
        }
    },
    referencia_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Referencias,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'foto_referencia'
});

// Asociaciones
Fotos.hasMany(FotoReferencia, { foreignKey: 'foto_id' });
FotoReferencia.belongsTo(Fotos, { foreignKey: 'foto_id' });

Referencias.hasMany(FotoReferencia, { foreignKey: 'referencia_id' });
FotoReferencia.belongsTo(Referencias, { foreignKey: 'referencia_id' });
