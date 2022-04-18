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
      institucion: {
        type: Sequelize.STRING,
      },
      lugar_de_emision: {
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
    await queryInterface.dropTable('grado_academico');
  }
};