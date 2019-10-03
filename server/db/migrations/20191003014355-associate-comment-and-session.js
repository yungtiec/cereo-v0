module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("comments", "session_id", {
        type: Sequelize.STRING(36),
        references: {
          model: "Sessions",
          key: "sid"
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn("comments", "session_id")];
  }
};
