module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('actor_drama', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      actor_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'actors',
          key: 'id'
        },
        allowNull: false,
      },
      drama_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'dramas',
          key: 'id'
        },
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('actor_drama');
  }
};
