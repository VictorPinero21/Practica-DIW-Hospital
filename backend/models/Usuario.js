const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    centro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol: {
      type: DataTypes.ENUM('administrador', 'alumno'),
      allowNull: false,
      defaultValue: 'alumno',
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios', // 👈 Asegúrate de que el nombre es en plural
    timestamps: true,
    underscored: true,
  }
);

module.exports = Usuario;
