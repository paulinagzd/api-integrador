module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        first_name: {
          type: Sequelize.STRING
        },
        last_name: {
          type: Sequelize.STRING
        },
        email: {
          unique: true,
          type: Sequelize.STRING
        },
        role: {
          type: Sequelize.ENUM('admin', 'user')
        },
        salt: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        last_login: {
          type: Sequelize.DATE
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
      await queryInterface.dropTable('Users');
    }
  };
  