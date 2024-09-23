// seeders/20230923000000-demo-user.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        googleId: null,
        username: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hash('12345678', 10),
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        googleId: null,
        username: 'user',
        email: 'user@example.com',
        password: bcrypt.hash('12345678', 10),
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
