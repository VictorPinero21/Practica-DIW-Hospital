const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Muestra extends Model {}

Muestra.init(
  {
    id: {
      type: DataTypes.UUID,
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
    tincion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qr_muestra: {
      type: DataTypes.TEXT,
    },
    cassette_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cassettes', // 👈 Asegúrate de que es el nombre de la tabla en plural
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Muestra',
    tableName: 'muestras', // 👈 Asegúrate de que coincide con `references.model`
    timestamps: true,
    underscored: true,
  }
);

module.exports = Muestra;
