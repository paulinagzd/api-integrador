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
        this.belongsTo(models.materia_impartida, {
          foreignKey: {
            name: 'id_materia_impartida'
          }
        });
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
      calificacion: {
        type: DataTypes.FLOAT,
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'ecoa',
    });
    return ECOA;
  };
  