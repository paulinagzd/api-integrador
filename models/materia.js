const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Materia extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    Materia.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      codigo: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      nombre: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tipo: {
        type: DataTypes.ENUM('bloque', 'materia', 'semana_tec'),
      },
      semestre: {
        type: DataTypes.INTEGER,
      },
      periodo: {
        type: DataTypes.ENUM('PMT1', 'PMT2', 'PMT3', 'PMT4', 'PMT5', 'PMT6', 'semestral'),
      },
      duracion_en_semanas: {
        type: DataTypes.ENUM('1', '5', '10', '15'),
      },
      plan: {
        type: DataTypes.ENUM('Tec20', 'Tec21'),
      },
      unidades_de_carga: {
        type: DataTypes.FLOAT,
      },
      CIP: {
        type: DataTypes.INTEGER,
      },
      notas: {
        type: DataTypes.STRING,
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'materia',
    });
    return Materia;
  };
  