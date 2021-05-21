const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogames', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    released:{
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
    // nameUrl:{
    //   type: DataTypes.STRING
    // },
    // route:{
    //   type: DataTypes.VIRTUAL,
    //   get(){
    //       return '/pages/' + this.getDataValue('nameUrl');
    //     }
    //   },
    // gmid:{
    //   type: DataTypes.VIRTUAL,
    //   get(){
    //     return "gm" + this.getDataValue('id')
    //   }
    // }
  });


};


  