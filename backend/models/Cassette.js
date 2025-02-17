const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Cassette extends Model {}

Cassette.init(
  {
    id: {
      type: DataTypes.UUID, // Asegúrate de que coincide con el tipo de `id` en Usuario
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    organo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caracteristicas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qr_cassette: {
      type: DataTypes.TEXT,
    },
    usuario_id: {
      type: DataTypes.UUID, // 👈 Debe coincidir con `id` en Usuario
      allowNull: false,
      references: {
        model: 'usuarios', // 👈 Asegúrate de que es el nombre de la tabla, no del modelo
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Cassette',
    tableName: 'cassettes',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Cassette;
