const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Cassette extends Model {}

Cassette.init(
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
        type: DataTypes.STRING, // Puede ser STRING o TEXT si es muy largo
      
      }
    
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Cassette', // We need to choose the model name
    //table
  },
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true