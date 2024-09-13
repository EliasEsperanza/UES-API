import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Aulas } from "./Aulas.js";
import { Referencias } from "./Referencias.js";

export const AulaReferencia = sequelize.define('aula_referencia', {
    aula_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Aulas,
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
    tableName: 'aula_referencia'
});

Aulas.belongsToMany(Referencias, { through: AulaReferencia, foreignKey: 'aula_id' });
Referencias.belongsToMany(Aulas, { through: AulaReferencia, foreignKey: 'referencia_id' });
