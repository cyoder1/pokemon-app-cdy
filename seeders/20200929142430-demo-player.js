'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Players",
      [
        {
            name:'Tony Stark',
            username: 'ironman',
            password: 'prettyawesome',
            teamId: 1
        },
        {
            name:'Clark Kent',
            username: 'superman',
            password: `canfly`,
            teamId: 2
        },
        {
            name:'Bruce Wayne',
            username: 'batman',
            password: 'hasgadgets',
            teamId: 3
        }
    ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null, {});
  }
};

