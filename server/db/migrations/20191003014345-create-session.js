module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Sessions", {
      sid: {
        type: Sequelize.STRING(36),
        primaryKey: true
      },
      expire: {
        type: Sequelize.DATE
      },
      data: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("Sessions");
  }
};
