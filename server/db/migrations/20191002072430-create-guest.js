module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("guests", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("guests");
  }
};
