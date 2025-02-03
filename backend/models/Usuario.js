const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
        type: DataTypes.STRING, // Puede ser STRING o TEXT si es muy largo
        allowNull: false, // Opcional: evita valores nulos
        unique: true, // Opcional: garantiza que no haya correos duplicados
        validate: {
        isEmail: true // Valida que el valor sea un correo válido
  }
      },
    password: {
        type: DataTypes.STRING, // Se recomienda STRING ya que se almacenará en formato hash
        allowNull: false, // Evita valores nulos
        validate: {
          len: [8, 100] // Longitud mínima de 8 caracteres y máxima de 100 (ajustable según necesidad)

      },
      centro: {
        type: DataTypes.STRING, // Puede ser STRING o TEXT si es muy largo
      
      },
     rol:{
        type: DataTypes.STRING,
     
     }
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Usuario', // We need to choose the model name
    //table
  },
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true