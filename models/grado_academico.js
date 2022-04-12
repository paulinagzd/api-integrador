const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class GradoAcademico extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        this.belongsTo(models.profesor, {as: 'profesor'});
      }
    }
    GradoAcademico.init({
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
      tipo_de_grado: {
        type: DataTypes.ENUM('licenciatura', 'maestria', 'doctorado', 'area_sacs', 'carta_de_excepcion'),
      },
      tipo: {
        type: DataTypes.ENUM('planta', 'plantaInterna', 'lecture', 'catedra', 'pensionado', 'm40', 'director', 'investigador', 'otroCampus'),
      },
      ubicacion: {
        type: DataTypes.STRING,
      },
      fecha_de_emision: {
        type: DataTypes.DATE,
      },
      CIP_normatividad: {
        type: DataTypes.INTEGER,
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'grado_academico',
    });
    return GradoAcademico;
  };
  