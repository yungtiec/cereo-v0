module.exports = (db, DataTypes) => {
  const Role = db.define("role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  Role.associate = function(models) {
    Role.hasMany(models.membership, {
      foreignKey: {
        name: "roleId",
        field: "role_id"
      }
    });
  };
  Role.loadScopes = function(models) {};
  return Role;
};
