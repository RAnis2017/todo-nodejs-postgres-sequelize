'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', [{
      id: 1,
      title: 'Clean House',
      parentId: null,
      status: false
    }, {
      id: 2,
      title: 'Shopping List',
      parentId: null,
      status: true
    }, {
      id: 3,
      title: 'Get rotten fruits out of the fridge',
      parentId: 1,
      status: false
    }, {
      id: 4,
      title: 'Take the trash out',
      parentId: 1,
      status: true
    }, {
      id: 5,
      title: 'Buy Bananas and Cookies',
      parentId: 2,
      status: true
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
