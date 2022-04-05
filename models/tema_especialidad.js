const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class TemaEspecialidad extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    TemaEspecialidad.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombre: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'tema_especialidad',
    });
    return TemaEspecialidad;
  };
  