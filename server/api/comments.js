const router = require("express").Router();
const { Comment } = require("../db/models");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      siteId: 1,
      ownerId: req.user ? req.user.id : null
      // sessionId: req.sessionID
    });
    res.send(comment);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  console.log(req.cookies, res.cookies);
  try {
    var where = {
      siteId: 1
    };
    // if (req.user) where.userId = req.user.id;
    // else where.sessionId = req.sessionID;
    const comments = await Comment.findAll({
      where,
      order: [["updatedAt", "DESC"]],
      ...req.query
    });
    res.send(comments);
  } catch (err) {
    next(err);
  }
});
