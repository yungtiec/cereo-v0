const Sequelize = require("sequelize");

module.exports = (db, DataTypes) => {
  const Comment = db.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.TEXT
      },
      resolved: {
        type: DataTypes.BOOLEAN
      },
      deviceInfo: {
        type: DataTypes.JSONB,
        field: "device_info"
      },
      pageInfo: {
        type: DataTypes.JSONB,
        field: "page_info"
      }
    },
    { paranoid: true }
  );
  Comment.isHierarchy();
  Comment.associate = function(models) {
    Comment.belongsTo(models.user, {
      foreignKey: {
        name: "ownerId",
        field: "owner_id"
      },
      as: "owner"
    });
    Comment.belongsTo(models.guest, {
      foreignKey: {
        name: "guestId",
        field: "guest_id"
      },
      as: "guestOwner"
    });
    Comment.belongsTo(models.site, {
      foreignKey: {
        name: "siteId",
        field: "site_id"
      }
    });
  };
  Comment.loadScopes = function(models) {
    var includeBasicMetadata = [
      {
        model: models.user,
        as: "owner",
        attributes: ["id", "email", "name"]
      },
      {
        model: models.guest,
        as: "guestOwner",
        attributes: ["id", "email", "name"]
      }
    ];
    Comment.addScope("main", function({ where, include, attributes }) {
      var defaultInclude = includeBasicMetadata;
      var defaultAttributes = [
        "id",
        "text",
        "ownerId",
        "guestId",
        "deviceInfo",
        "pageInfo",
        "createdAt",
        "updatedAt",
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM commentsancestors WHERE commentsancestors."ancestorId" = comment.id)`
          ),
          "numReplies"
        ]
      ];
      var query = { include: defaultInclude, attributes: defaultAttributes };
      if (where) query.where = where;
      if (include) query.include = defaultInclude.concat(include);
      if (attributes) query.attributes = defaultAttributes.concat(attributes);
      return query;
    });
    Comment.addScope("withReplies", function() {
      return {
        include: [
          {
            model: models.comment,
            required: false,
            include: [
              {
                model: models.user,
                as: "owner",
                required: false,
                attributes: ["id", "email", "name"]
              },
              {
                model: models.guest,
                as: "guestOwner",
                required: false,
                attributes: ["id", "email", "name"]
              },
              {
                model: models.comment,
                as: "parent",
                required: false,
                include: [
                  {
                    model: models.user,
                    as: "owner",
                    required: false,
                    attributes: ["id", "email", "name"]
                  },
                  {
                    model: models.guest,
                    as: "guestOwner",
                    required: false,
                    attributes: ["id", "email", "name"]
                  }
                ]
              }
            ],
            as: "descendents"
          }
        ],
        order: [["createdAt", "DESC"]]
      };
    });
  };
  return Comment;
};
