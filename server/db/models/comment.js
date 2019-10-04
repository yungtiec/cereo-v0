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
    // var includeBasicMetadata = [
    //   {
    //     model: models.user,
    //     as: "owner",
    //     attributes: ["id", "email", "name", "username"]
    //   }
    // ];
    // Comment.addScope("main", function({
    //   extendedWhere,
    //   extendedInclude,
    //   extendedAttributes
    // }) {
    //   var include = includeBasicMetadata;
    //   var attributes = [
    //     "id",
    //     "text",
    //     "ownerId",
    //     "guestName",
    //     "createdAt",
    //     "updatedAt",
    //     [
    //       Sequelize.literal(
    //         `(SELECT COUNT(*) FROM commentsancestors WHERE commentsancestors."ancestorId" = comment.id)`
    //       ),
    //       "numReplies"
    //     ]
    //   ];
    //   var query = { include, attributes };
    //   if (extendedWhere) query.where = extendedWhere;
    //   if (extendedInclude) query.include = include.concat(extendedInclude);
    //   if (extendedAttributes)
    //     query.attributes = attributes.concat(extendedAttributes);
    //   return query;
    // });
    // Comment.addScope("withReplies", function() {
    //   return {
    //     include: [
    //       {
    //         model: models.comment,
    //         required: false,
    //         include: [
    //           {
    //             model: models.user,
    //             as: "owner",
    //             attributes: ["id", "email", "name", "username"]
    //           },
    //           {
    //             model: models.comment,
    //             as: "parent",
    //             required: false,
    //             include: [
    //               {
    //                 model: models.user,
    //                 as: "owner",
    //                 attributes: ["id", "email", "name", "username"]
    //               }
    //             ]
    //           }
    //         ],
    //         as: "descendents"
    //       }
    //     ],
    //     order: [["createdAt", "DESC"]]
    //   };
    // });
  };
  return Comment;
};
