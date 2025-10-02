'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addConstraint('borrows', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'fk_borrows_user',
    references: {
      table: 'users',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  await queryInterface.addConstraint('borrows', {
    fields: ['book_id'],
    type: 'foreign key',
    name: 'fk_borrows_book',
    references: {
      table: 'books',
      field: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeConstraint('borrows', 'fk_borrows_user');
  await queryInterface.removeConstraint('borrows', 'fk_borrows_book');
};
