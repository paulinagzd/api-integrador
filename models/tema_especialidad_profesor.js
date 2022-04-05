const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class TemaEspecialidadProfesor extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        this.belongsTo(models.Profesor, {as:'Profesor'});
        this.belongsTo(models.TemaEspecialidad,{as:'TemaEspecialidad'});
      }
    }
    TemaEspecialidadProfesor.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nivel: {
        type: DataTypes.ENUM('basico', 'avanzado', 'experto'),
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'tema_especialidad_profesor',
    });
    return TemaEspecialidadProfesor;
  };
  