'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tema_especialidad_profesor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nivel: {
        type: Sequelize.ENUM('basico', 'avanzado', 'experto'),
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
      id_tema_especialidad: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tema_especialidad', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tema_especialidad_profesor');
  }
};