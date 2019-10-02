module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("memberships", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      }),
      queryInterface.addColumn("memberships", "role_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id"
        }
      }),
      queryInterface.addColumn("memberships", "account_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "accounts",
          key: "id"
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn("memberships", "user_id"),
      queryInterface.removeColumn("memberships", "account_id"),
      queryInterface.removeColumn("memberships", "role_id")
    ];
  }
};
