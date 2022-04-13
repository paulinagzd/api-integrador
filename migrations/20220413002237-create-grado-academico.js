'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('grado_academico', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tipo_de_grado: {
        type: Sequelize.ENUM('licenciatura', 'maestria', 'doctorado', 'area_sacs', 'carta_de_excepcion'),
      },
      tipo: {
        type: Sequelize.ENUM('planta', 'plantaInterna', 'lecture', 'catedra', 'pensionado', 'm40', 'director', 'investigador', 'otroCampus'),
      },
      ubicacion: {
        type: Sequelize.STRING,
      },
      fecha_de_emision: {
        type: Sequelize.DATE,
      },
      CIP_normatividad: {
        type: Sequelize.INTEGER,
      },
      id_profesor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'profesor', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('grado_academico');
  }
};