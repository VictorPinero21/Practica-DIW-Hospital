const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../../config/db');

class Cassette extends Model {}

Cassette.init(
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
    organo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El campo 'organo' no puede estar vacío."
        },
        isAlpha: {
          msg: "El campo 'organo' solo puede contener letras."
        },
        len: {
          args: [3, 50],
          msg: "El campo 'organo' debe tener entre 3 y 50 caracteres."
        },
        isIn: {
          args: [["corazón", "hígado", "pulmón", "riñón", "cerebro"]],
          msg: "El 'organo' debe ser uno de los valores permitidos."
        }
      }
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
      type: DataTypes.UUID, 
      allowNull: false,
      references: {
        model: 'usuarios',
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
