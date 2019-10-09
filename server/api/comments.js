const router = require("express").Router();
const { Comment, User, Guest } = require("../db/models");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      siteId: 1,
      ownerId: req.user ? req.user.id : null,
      guestId: (!req.user && req.session.guestId) || null
    }).then(c =>
      Comment.scope([
        {
          method: ["main", {}]
        },
        { method: ["withReplies"] }
      ]).findOne({ where: { id: c.id } })
    );
    res.send(comment);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    var where = {
      siteId: 1,
      hierarchyLevel: 1
    };
    const [comments, count] = await Promise.all([
      Comment.scope([
        {
          method: [
            "main",
            {
              where,
              include: [
                {
                  model: User,
                  as: "owner",
                  required: false
                },
                {
                  model: Guest,
                  as: "guestOwner",
                  required: false
                }
              ],
              order: [["updatedAt", "DESC"]]
            }
          ]
        },
        { method: ["withReplies"] }
      ]).findAll(req.query),
      Comment.scope([
        {
          method: [
            "main",
            {
              where
            }
          ]
        }
      ]).count()
    ]);
    console.log(count);
    res.send({ comments, count });
  } catch (err) {
    next(err);
  }
});

router.put("/:commentId", async (req, res, next) => {
  var comment = await Comment.findOne({
    where: { id: req.params.commentId }
  });
  if (
    (comment.ownerId && comment.ownerId !== req.user.id) ||
    (comment.guestId && comment.guestId !== req.session.guestId)
  ) {
    res.sendStatus(401);
    return;
  }
  comment = await comment.update(req.body);
  res.send(comment);
});

router.delete("/:commentId", async (req, res, next) => {
  var comment = await Comment.findOne({
    where: { id: req.params.commentId }
  });
  if (
    (comment.ownerId && comment.ownerId !== req.user.id) ||
    (comment.guestId && comment.guestId !== req.session.guestId)
  ) {
    res.sendStatus(401);
    return;
  }
  await Comment.destroy({
    where: { id: req.params.commentId },
    paranoid: true
  });
  res.sendStatus(200);
});

router.post("/:rootId/reply", async (req, res, next) => {
  try {
    const parent = await Comment.findById(Number(req.params.rootId));
    const child = {
      text: req.body.text,
      siteId: parent.siteId,
      ownerId: req.user ? req.user.id : null,
      guestId: (!req.user && req.session.guestId) || null
    };
    var reply = await Comment.create(child);
    await reply.setParent(parent.toJSON().id);
    reply = await Comment.scope([
      {
        method: ["main", {}]
      }
    ]).findOne({ where: { id: reply.id } });
    res.send(reply);
  } catch (err) {
    next(err);
  }
});
