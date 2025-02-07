const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../../config/db');
const bcrypt = require('bcrypt');


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
      validate: {
        isAlpha: {
          args: true,
          msg: 'El nombre solo puede contener letras',
        },
        len: {
          args: [3, 50],
          msg: 'El nombre debe tener entre 3 y 50 caracteres',
        },
      },
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: 'El apellido solo puede contener letras',
        },
        len: {
          args: [3, 50],
          msg: 'El apellido debe tener entre 3 y 50 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'El email no es válido',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,100}$/],
          msg: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial (Ejemplo: Abcdef1!)."
        },
        len: {
          args: [8, 100],
          msg: "La contraseña debe tener entre 8 y 100 caracteres."
        },
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
      validate: {
        isIn: {
          args: [['administrador', 'alumno']],
          msg: "El rol debe ser 'administrador' o 'alumno'.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    underscored: true,
    hooks: {
      // Hook antes de crear un usuario
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      },
      // Hook antes de actualizar un usuario
      beforeUpdate: async (usuario) => {
        if (usuario.changed("password")) { // Solo hashea si la contraseña cambió
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      },
    },

  }
);

module.exports = Usuario;
