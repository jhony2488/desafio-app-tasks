'use strict';

/** @type {import('sequelize-cli').Migration} */

import { mockedTasksSeeders } from '../../app/utils/mockedValues.ts';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('Tasks', mockedTasksSeeders, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {});
  },
};
