const crypto = require("crypto");
const Sequelize = require("sequelize");

module.exports = (db, DataTypes) => {
  const User = db.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("password");
        }
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        field: "reset_password_token"
      },
      resetPasswordExpiration: {
        type: DataTypes.STRING,
        field: "reset_password_expiration"
      },
      salt: {
        type: DataTypes.STRING,
        // Making `.salt` act like a function hides it when serializing to JSON.
        // This is a hack to get around Sequelize's lack of a "private" option.
        get() {
          return () => this.getDataValue("salt");
        }
      },
      googleId: {
        type: DataTypes.STRING,
        field: "google_id"
      },
      avatarUrl: {
        type: Sequelize.TEXT,
        field: "avatar_url"
      },
      onboarding: {
        type: DataTypes.BOOLEAN
      }
    },
    { paranoid: true }
  );

  /**
   * associations
   */
  User.associate = function(models) {
    User.hasMany(models.comment, {
      foreignKey: {
        name: "ownerId",
        field: "owner_id"
      },
      as: "comments"
    });
    User.hasMany(models.membership, {
      foreignKey: {
        name: "userId",
        field: "user_Id"
      }
    });
  };

  /**
   * scopes
   */
  User.loadScopes = function(models) {
    // scopes can be defined here
  };

  /**
   * instanceMethods
   */
  User.prototype.correctPassword = function(candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt()) === this.password();
  };

  /**
   * classMethods
   */
  User.generateSalt = function() {
    return crypto.randomBytes(16).toString("base64");
  };

  User.encryptPassword = function(plainText, salt) {
    return crypto
      .createHash("RSA-SHA256")
      .update(plainText)
      .update(salt)
      .digest("hex");
  };

  /**
   * hooks
   */
  const setSaltAndPassword = user => {
    if (user.changed("password")) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };

  const hookChain = user => {
    setSaltAndPassword(user);
  };

  User.beforeCreate(hookChain);
  User.beforeUpdate(hookChain);

  return User;
};
