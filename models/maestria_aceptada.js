const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class MaestriaAceptada extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        this.belongsTo(models.materia, {
          foreignKey: {
            name: 'id_materia'
          }
        });
      }
    }
    MaestriaAceptada.init({
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
      modelName: 'maestria_aceptada',
    });
    return MaestriaAceptada;
  };
  