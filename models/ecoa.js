const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class ECOA extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        this.belongsTo(models.MateriaImpartida, {as: 'MateriaImpartida'});
      }
    }
    ECOA.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fecha: {
        type: DataTypes.DATE,
      },
      calificaion: {
        type: DataTypes.INT,
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'ecoa',
    });
    return ECOA;
  };
  