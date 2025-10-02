'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('books', 'status', {
    type: Sequelize.DataTypes.ENUM("available", "borrowed"),
    defaultValue: 'available',
    allowNull: true,
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('books', 'status');
};
