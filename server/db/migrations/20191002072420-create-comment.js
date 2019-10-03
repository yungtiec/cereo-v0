module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: Sequelize.TEXT
      },
      resolved: {
        type: Sequelize.BOOLEAN
      },
      guestName: {
        type: Sequelize.STRING,
        field: "guest_name"
      },
      deviceInfo: {
        type: Sequelize.JSONB,
        field: "device_info"
      },
      pageInfo: {
        type: Sequelize.JSONB,
        field: "page_info"
      },
      hierarchyLevel: {
        // sequelize hierarchy
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("comments");
  }
};
