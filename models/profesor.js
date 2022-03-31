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
    // estatus_interno: {
    //   type: DataTypes.STRING, // ENUM
    // },
    // tipo: {
    //   type: DataTypes.STRING, // ENUM
    // },
    clase_en_ingles: {
      type: DataTypes.BOOLEAN,
    },
    unidades_de_carga_max: {
      type: DataTypes.INTEGER,
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
