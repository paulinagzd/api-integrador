'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('materia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.ENUM('bloque', 'materia', 'semana_tec'),
      },
      semestre: {
        type: Sequelize.INTEGER,
      },
      periodo: {
        type: Sequelize.ENUM('PMT1', 'PMT2', 'PMT3', 'PMT4', 'PMT5', 'PMT6', 'semestral'),
      },
      duracion_en_semanas: {
        type: Sequelize.ENUM('1', '5', '10', '15'),
      },
      plan: {
        type: Sequelize.ENUM('Tec20', 'Tec21'),
      },
      unidades_de_carga: {
        type: Sequelize.INTEGER,
      },
      CIP: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('materia');
  }
};