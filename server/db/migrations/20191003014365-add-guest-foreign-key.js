module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("guests", "session_id", {
        type: Sequelize.STRING(36),
        references: {
          model: "Sessions",
          key: "sid"
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn("guests", "session_id")];
  }
};
