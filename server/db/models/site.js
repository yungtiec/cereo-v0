const { createSlug } = require("../../utils");

module.exports = (db, DataTypes) => {
  const Site = db.define(
    "site",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      slug: {
        type: DataTypes.TEXT
      }
    },
    { paranoid: true }
  );
  Site.associate = function(models) {
    Site.hasMany(models.comment);
    Site.belongsTo(models.membership, {
      foreignKey: {
        name: "ownerMembershipId",
        field: "owner_membreship_id"
      },
      as: "ownerMembership"
    });
  };
  Site.loadScopes = function(models) {};

  const setSlug = site => {
    site.slug = createSlug({
      baseName: site.name,
      stringToBeHashed: site.name + site.id
    });
  };

  Site.beforeCreate(site => {
    setSlug(site);
  });
  return Site;
};
