module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("sites", "owner_membership_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "memberships",
          key: "id"
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn("sites", "owner_membership_id")];
  }
};
