module.exports = (db, DataTypes) => {
  const Session = db.define(
    "session",
    {
      sid: {
        type: DataTypes.STRING(36),
        primaryKey: true
      },
      expire: {
        type: DataTypes.DATE
      },
      data: {
        type: DataTypes.TEXT
      }
    },
    { tableName: "Sessions" }
  );
  Session.associate = function(models) {
    Session.hasOne(models.guest, {
      foreignKey: {
        name: "sessionId",
        field: "session_id"
      }
    });
  };
  Session.loadScopes = function(models) {};
  return Session;
};
