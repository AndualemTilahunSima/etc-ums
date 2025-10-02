'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('books', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
    },
    updated_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
    },
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('books');
};
