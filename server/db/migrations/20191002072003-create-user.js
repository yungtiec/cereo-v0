module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        get() {
          return () => this.getDataValue("password");
        }
      },
      resetPasswordToken: {
        type: Sequelize.STRING,
        field: "reset_password_token"
      },
      resetPasswordExpiration: {
        type: Sequelize.STRING,
        field: "reset_password_expiration"
      },
      salt: {
        type: Sequelize.STRING,
        // Making `.salt` act like a function hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
          return () => this.getDataValue("salt");
        }
      },
      googleId: {
        type: Sequelize.STRING,
        field: "google_id"
      },
      avatarUrl: {
        type: Sequelize.TEXT,
        field: "avatar_url"
      },
      onboarding: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable("users");
  }
};
