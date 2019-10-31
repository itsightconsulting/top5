'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (t) {
      return Promise.all([queryInterface.createTable('users', {
        id: Sequelize.INTEGER
      }, {
        transaction: t
      }), queryInterface.createTable('users', {
        id: Sequelize.INTEGER
      }, {
        transaction: t
      })]);
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },
  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
        Example:
      return queryInterface.dropTable('users');
    */
  }
};