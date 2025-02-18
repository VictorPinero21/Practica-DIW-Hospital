const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Imagen extends Model {}

Imagen.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.BLOB("long"), // Guarda la imagen en binario
      allowNull: false,
  },
    muestra_id: { // 👈 Asegúrate de usar un solo campo para la clave foránea
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'muestras', // 👈 Usa el nombre de la tabla, no del modelo
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Imagen',
    tableName: 'imagenes',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Imagen;
