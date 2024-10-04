import { sequelize } from "../database/database.js";
import { DataTypes } from 'sequelize';
import { Aulas } from './Aulas.js';  
import { Fotos } from './Fotos.js';  

export const FotosAulas = sequelize.define('fotos_aulas', {
    fotos_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Fotos,
            key: 'id'
        }
    },
    aula_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Aulas,
            key: 'id'
        }
    }
}, {
    timestamps: false, 
    tableName: 'fotos_aulas'  
});

Aulas.belongsToMany(Fotos, { through: FotosAulas, foreignKey: 'aula_id' });
Fotos.belongsToMany(Aulas, { through: FotosAulas, foreignKey: 'fotos_id' });