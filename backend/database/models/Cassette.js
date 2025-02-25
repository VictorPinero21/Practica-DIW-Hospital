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
        len: {
          args: [3, 50],
          msg: "El campo 'organo' debe tener entre 3 y 50 caracteres."
        },
        isIn: {
          args: [[   "Cerebro",
            "Cerebelo",
            "Tronco encefalico",
            "Medula espinal",
            "Corazon",
            "Pulmones",
            "Higado",
            "Riñones",
            "Bazo",
            "Pancreas",
            "Estomago",
            "Intestino delgado",
            "Intestino grueso",
            "Esofago",
            "Vesicula biliar",
            "Glándulas suprarrenales",
            "Timo",
            "Tiroides",
            "Paratiroides",
            "Tráquea",
            "Laringe",
            "Faringe",
            "Ovarios",
            "Testiculos",
            "Utero",
            "Prostata",
            "Vagina",
            "Pene",
            "Vejiga",
            "Ureteres",
            "Uretra",
            "Hipotalamo",
            "Hipofisis"]],
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
      allowNull: false,
      defaultValue: () => "QR" + Math.random().toString(36).substring(7),
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
