'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query(`
  CREATE UNIQUE INDEX unique_borrowed_book
ON borrows ((CASE WHEN status = 'BORROWED' THEN book_id END));;
`);
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.sequelize.query(`
    DROP INDEX IF EXISTS unique_borrowed_book;
  `);
};
