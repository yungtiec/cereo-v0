module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("comments", "owner_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      }),
      queryInterface.addColumn("comments", "site_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "sites",
          key: "id"
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn("comments", "owner_id"),
      queryInterface.removeColumn("comments", "site_id")
    ];
  }
};
