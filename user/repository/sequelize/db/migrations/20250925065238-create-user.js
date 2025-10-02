'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {          // <-- snake_case
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    birth_date: {         // <-- snake_case
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.DataTypes.ENUM("ADMIN", "LIBRARIAN", "MEMBER"),
      allowNull: false,
    },
    language: {
      type: Sequelize.DataTypes.ENUM("ENGLISH", "ARABIC"),
      allowNull: false,
    },
    status: {
      type: Sequelize.DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
      defaultValue: "PENDING",
    },
    created_at: {        // <-- snake_case
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
    },
    updated_at: {        // <-- snake_case
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
    },
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('users');
};
