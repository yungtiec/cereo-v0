module.exports = (db, DataTypes) => {
  const Account = db.define(
    "account",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      plan: {
        type: DataTypes.STRING
      }
    },
    { paranoid: true }
  );
  Account.associate = function(models) {
    Account.hasMany(models.membership, {
      foreignKey: {
        name: "accountId",
        field: "account_Id"
      }
    });
  };
  Account.loadScopes = function(models) {};
  return Account;
};
