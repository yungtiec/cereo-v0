module.exports = (db, DataTypes) => {
  const Guest = db.define("guest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    }
  });
  Guest.associate = function(models) {
    Guest.hasMany(models.comment, {
      foreignKey: {
        name: "guestId",
        field: "guest_id"
      }
    });
    Guest.belongsTo(models.session, {
      foreignKey: {
        name: "sessionId",
        field: "session_id"
      }
    });
  };
  Guest.loadScopes = function(models) {};
  return Guest;
};
