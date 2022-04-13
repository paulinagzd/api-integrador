const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class MateriaBloqueada extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        this.belongsTo(models.materia, {as: 'materia'});
        this.belongsTo(models.profesor, {as: 'profesor'});
      }
    }
    MateriaBloqueada.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'materia_bloqueada',
    });
    return MateriaBloqueada;
  };
  