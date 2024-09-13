import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Aulas } from "./Aulas.js";
import { Zonas } from "./Zonas.js";

export const AulaZona = sequelize.define('aula_zona', {
    aula_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Aulas,
            key: 'id'
        }
    },
    zona_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Zonas,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'aula_zona'
});

Aulas.belongsToMany(Zonas, { through: AulaZona, foreignKey: 'aula_id' });
Zonas.belongsToMany(Aulas, { through: AulaZona, foreignKey: 'zona_id' });
