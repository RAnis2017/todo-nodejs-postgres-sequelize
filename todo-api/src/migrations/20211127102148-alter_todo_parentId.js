'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Todos', 'status', {type: Sequelize.BOOLEAN, defaultValue: false});
    await queryInterface.addColumn('Todos', 'parentId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Todos',
        key: 'id',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Todos', 'status');
    await queryInterface.removeColumn('Todos', 'parentId');
  }
};
