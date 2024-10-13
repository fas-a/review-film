// migrations/20240915009000-create-user.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        googleId: { type: Sequelize.TEXT },
        photo: {
          type: Sequelize.TEXT
        },
        username: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING(100)
        },
        role: {
          type: Sequelize.ENUM('Admin', 'User'),
          defaultValue: 'User'
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
    }
  };
  