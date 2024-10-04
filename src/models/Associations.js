import { Aulas } from './Aulas.js';
import { Referencias } from './Referencias.js';
import { AulaReferencia } from './Aula_Referencia.js';
import { Zonas } from './Zonas.js';
import { AulaZona } from './Aula_Zona.js';
import { Videos } from './Videos.js';
import { VideoReferencia } from './Video_Referencia.js';
import { FotosAulas } from './Aula_Fotos.js';
import { Fotos } from './Fotos.js';

//asociaciones AulaReferencia
Aulas.belongsToMany(Referencias, { through: AulaReferencia, foreignKey: 'aula_id' });
Referencias.belongsToMany(Aulas, { through: AulaReferencia, foreignKey: 'referencia_id' });

//asociaciones AulaZona
Aulas.belongsToMany(Zonas, { through: AulaZona, foreignKey: 'aula_id' });
Zonas.belongsToMany(Aulas, { through: AulaZona, foreignKey: 'zona_id' });

// Asociaciones individuales
Aulas.belongsTo(Zonas, { foreignKey: 'zona', as: 'zonaRelacionada' });
Referencias.belongsTo(Zonas, { foreignKey: 'zona', as: 'zonaReferencia' });

//Asociaciones de videos
Referencias.belongsTo(Videos, { foreignKey: 'video_id', as: 'videoReferencia' });
Aulas.belongsTo(Videos, { foreignKey: 'video_id', as: 'videoAula' });

//Asociaciones VideoReferencia
Videos.belongsToMany(Referencias,{through: VideoReferencia,foreignKey: 'video_id'});
Referencias.belongsToMany(Videos,{through: VideoReferencia, foreignKey: 'referencia_id'});

Aulas.belongsToMany(Fotos, { through: FotosAulas, foreignKey: 'aula_id' });
Fotos.belongsToMany(Aulas, { through: FotosAulas, foreignKey: 'foto_id' });
