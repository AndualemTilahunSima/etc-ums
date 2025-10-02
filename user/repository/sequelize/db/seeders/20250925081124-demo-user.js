
export const up = async (queryInterface, Sequelize) => {

  return queryInterface.bulkInsert('users', [
    {
      full_name: 'Andualem Tilahun',
      email: 'admin@example.com',
      birth_date: "1990-01-01",
      password: "$2b$10$U3f5JTmjMqnMtD4HPp6cBuIvAwdbuWCb7OrmpU5nAwXQ8oszX/i2y",
      role: "ADMIN",
      language: "ENGLISH"
    },
  ]);

};

export const down = async (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('users', null, {});
};
