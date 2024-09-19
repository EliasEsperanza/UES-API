import { Aulas } from './Aulas.js';
import { Referencias } from './Referencias.js';
import { AulaReferencia } from './Aula_Referencia.js';
import { Zonas } from './Zonas.js';
import { AulaZona } from './Aula_Zona.js';

//asociaciones AulaReferencia
Aulas.belongsToMany(Referencias, { through: AulaReferencia, foreignKey: 'aula_id' });
Referencias.belongsToMany(Aulas, { through: AulaReferencia, foreignKey: 'referencia_id' });

//asociaciones AulaZona
Aulas.belongsToMany(Zonas, { through: AulaZona, foreignKey: 'aula_id' });
Zonas.belongsToMany(Aulas, { through: AulaZona, foreignKey: 'zona_id' });

// Asociaciones individuales
Aulas.belongsTo(Zonas, { foreignKey: 'zona', as: 'zonaRelacionada' });
Referencias.belongsTo(Zonas, { foreignKey: 'zona', as: 'zonaReferencia' });
