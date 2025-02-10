const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Importar modelos
const Usuario = require('./Usuario');
const Cassette = require('./Cassette');
const Muestra = require('./Muestra');
const Imagen = require('./Imagen');

// Definir relaciones en orden correcto
Usuario.hasMany(Cassette, { foreignKey: 'usuario_id' });
Cassette.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Cassette.hasMany(Muestra, { foreignKey: 'cassette_id' });
Muestra.belongsTo(Cassette, { foreignKey: 'cassette_id' });

Muestra.hasMany(Imagen, { foreignKey: 'muestra_id' }); // 👈 Asegúrate de usar el campo correcto
Imagen.belongsTo(Muestra, { foreignKey: 'muestra_id' });

module.exports = {
  sequelize,
  Usuario,
  Cassette,
  Muestra,
  Imagen,
};
