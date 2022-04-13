module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profesor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nomina: {
        type: Sequelize.STRING,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      correo_institucional: {
        type: Sequelize.STRING,
      },
      correo_personal: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      estatus_interno: {
        type: Sequelize.ENUM('activo', 'inactivo', 'enContratacion', 'stand-by', 'rechazado'),
      },
      tipo: {
        type: Sequelize.ENUM('planta', 'plantaInterna', 'lecture', 'catedra', 'pensionado', 'm40', 'director', 'investigador', 'otroCampus'),
      },
      clase_en_ingles: {
        type: Sequelize.BOOLEAN,
      },
      unidades_de_carga_max: {
        type: Sequelize.INTEGER,
      },
      empresa_donde_trabaja: {
        type: Sequelize.STRING,
      },
      notas: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('profesor');
  },
};
