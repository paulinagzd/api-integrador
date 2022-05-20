const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profesor.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nomina: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    correo_institucional: {
      type: DataTypes.STRING,
    },
    correo_personal: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    estatus_interno: {
      type: DataTypes.ENUM('activo', 'inactivo', 'enContratacion', 'stand-by', 'rechazado'),
    },
    tipo: {
      type: DataTypes.ENUM('planta', 'plantaInterna', 'lecture', 'catedra', 'pensionado', 'm40', 'director', 'investigador', 'otroCampus'),
    },
    clase_en_ingles: {
      type: DataTypes.BOOLEAN,
    },
    unidades_de_carga_max: {
      type: DataTypes.FLOAT,
    },
    empresa_donde_trabaja: {
      type: DataTypes.STRING,
    },
    notas: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'profesor',
  });
  return Profesor;
};
