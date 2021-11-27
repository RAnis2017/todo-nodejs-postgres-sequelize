'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Todos', 'completed', Sequelize.BOOLEAN);
    await queryInterface.addColumn('Todos', 'parentId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Todos',
        key: 'id',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Todos', 'completed');
    await queryInterface.removeColumn('Todos', 'parentId');
  }
};
