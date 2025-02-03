const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Muestra extends Model {}

Muestra.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
        type: DataTypes.STRING, // Puede ser STRING o TEXT si es muy largo
      
      },
     imagen:{
        type: DataTypes.BLOB,
     
     }
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Muestra', // We need to choose the model name
    //table
  },
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true