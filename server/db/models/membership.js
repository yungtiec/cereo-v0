module.exports = (db, DataTypes) => {
  const Membership = db.define(
    "membership",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    { paranoid: true }
  );
  Membership.associate = function(models) {
    Membership.hasMany(models.site, {
      foreignKey: {
        name: "ownerMembershipId",
        field: "owner_membreship_id"
      },
      as: "ownedSites"
    });
    Membership.belongsTo(models.account, {
      foreignKey: {
        name: "accountId",
        field: "account_id"
      }
    });
    Membership.belongsTo(models.user, {
      foreignKey: {
        name: "userId",
        field: "user_id"
      }
    });
    Membership.belongsTo(models.role, {
      foreignKey: {
        name: "roleId",
        field: "role_id"
      }
    });
  };
  Membership.loadScopes = function(models) {};
  return Membership;
};
